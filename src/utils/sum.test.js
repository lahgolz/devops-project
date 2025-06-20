import { sum } from './sum.js';

describe('sum function', () => {
	test('adds 1 + 2 to equal 3', () => {
		expect(sum(1, 2)).toBe(3);
	});

	test('adds positive numbers correctly', () => {
		expect(sum(5, 7)).toBe(12);
		expect(sum(10, 15)).toBe(25);
	});

	test('adds negative numbers correctly', () => {
		expect(sum(-1, -2)).toBe(-3);
		expect(sum(-5, -10)).toBe(-15);
	});

	test('adds positive and negative numbers correctly', () => {
		expect(sum(5, -3)).toBe(2);
		expect(sum(-8, 12)).toBe(4);
	});

	test('adds zero correctly', () => {
		expect(sum(0, 0)).toBe(0);
		expect(sum(5, 0)).toBe(5);
		expect(sum(0, -3)).toBe(-3);
	});

	test('adds decimal numbers correctly', () => {
		expect(sum(1.5, 2.5)).toBe(4);
		expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
	});
});
