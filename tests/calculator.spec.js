import { expect, test } from '@playwright/test';

test.describe('Sum Calculator', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the calculator with correct title', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Sum Calculator' })).toBeVisible();

		await expect(page.getByPlaceholder('First number')).toBeVisible();
		await expect(page.getByPlaceholder('Second number')).toBeVisible();

		await expect(page.getByRole('button', { name: 'Calculate Sum' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
	});

	test('should calculate sum of two positive numbers', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('5');
		await page.getByPlaceholder('Second number').fill('3');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('8')).toBeVisible();
	});

	test('should calculate sum of two negative numbers', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('-10');
		await page.getByPlaceholder('Second number').fill('-5');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('-15')).toBeVisible();
	});

	test('should calculate sum of positive and negative numbers', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('10');
		await page.getByPlaceholder('Second number').fill('-3');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('7')).toBeVisible();
	});

	test('should calculate sum of decimal numbers', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('2.5');
		await page.getByPlaceholder('Second number').fill('3.7');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('6.2')).toBeVisible();
	});

	test('should handle zero values', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('0');
		await page.getByPlaceholder('Second number').fill('5');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('5')).toBeVisible();
	});

	test('should show alert for invalid input - empty fields', async ({ page }) => {
		page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe('Please enter valid numbers!');

			await dialog.accept();
		});

		await page.getByRole('button', { name: 'Calculate Sum' }).click();
	});

	test('should show alert for invalid input - non-numeric values', async ({ page }) => {
		let dialogMessage = '';

		page.on('dialog', async (dialog) => {
			dialogMessage = dialog.message();

			await dialog.accept();
		});

		await page.evaluate(() => {
			const input = document.querySelector('input[placeholder="First number"]');

			if (input && input instanceof HTMLInputElement) {
				input.value = 'abc';

				input.dispatchEvent(new Event('change', { bubbles: true }));
			}
		});

		await page.getByPlaceholder('Second number').fill('5');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		expect(dialogMessage).toBe('Please enter valid numbers!');
	});

	test('should reset form when reset button is clicked', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('10');
		await page.getByPlaceholder('Second number').fill('20');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('30')).toBeVisible();

		await page.getByRole('button', { name: 'Reset' }).click();

		await expect(page.getByPlaceholder('First number')).toHaveValue('');
		await expect(page.getByPlaceholder('Second number')).toHaveValue('');

		await expect(page.getByText('Result:')).not.toBeVisible();
	});

	test('should handle large numbers', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('999999999');
		await page.getByPlaceholder('Second number').fill('1');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('Result:')).toBeVisible();
		await expect(page.getByText('1000000000')).toBeVisible();
	});

	test('should update result when calculating multiple times', async ({ page }) => {
		await page.getByPlaceholder('First number').fill('5');
		await page.getByPlaceholder('Second number').fill('3');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('8')).toBeVisible();

		await page.getByPlaceholder('First number').fill('10');
		await page.getByPlaceholder('Second number').fill('15');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('25')).toBeVisible();
		await expect(page.getByText('8')).not.toBeVisible();
	});
});

test.describe('Sum Calculator Visual Tests', () => {
	test('should have proper styling and layout', async ({ page }) => {
		await page.goto('/');

		const mainContainer = page.locator('.min-h-screen');
		await expect(mainContainer).toHaveClass(/bg-gradient-to-br/);

		const calculatorCard = page.locator('.bg-white.rounded-2xl');
		await expect(calculatorCard).toBeVisible();

		const inputs = page.locator('input[type="number"]');
		await expect(inputs.first()).toHaveClass(/border-2/);
		await expect(inputs.last()).toHaveClass(/border-2/);

		const buttons = page.locator('button');
		await expect(buttons.first()).toHaveClass(/bg-gradient-to-r/);
		await expect(buttons.last()).toHaveClass(/bg-gradient-to-r/);
	});

	test('should be responsive on mobile viewport', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		await expect(page.getByRole('heading', { name: 'Sum Calculator' })).toBeVisible();
		await expect(page.getByPlaceholder('First number')).toBeVisible();
		await expect(page.getByPlaceholder('Second number')).toBeVisible();

		await page.getByPlaceholder('First number').fill('5');
		await page.getByPlaceholder('Second number').fill('3');

		await page.getByRole('button', { name: 'Calculate Sum' }).click();

		await expect(page.getByText('8')).toBeVisible();
	});
});
