import eslint from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
	{
		ignores: [
			'**/*.min.*',
			'**/*.d.ts',
			'**/CHANGELOG.md',
			'**/dist',
			'**/LICENSE*',
			'**/output',
			'**/coverage',
			'**/temp',
			'**/build',
			'**/dist',
			'**/pnpm-lock.yaml',
			'**/yarn.lock',
			'.yarn/**',
			'**/package-lock.json',
			'**/__snapshots__',
			'!**/.github',
			'!**/.vscode',
		],
	},
	eslint.configs.recommended,
	sonarjs.configs.recommended,
	unicorn.configs.recommended,
	prettierRecommended,
	{
		plugins: {
			'import-x': importX,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
		},

		rules: {
			...importX.configs.recommended.rules,

			'consistent-return': 'off',
			'class-methods-use-this': 'off',
			'object-shorthand': [
				'error',
				'always',
				{
					avoidQuotes: true,
				},
			],
			'no-plusplus': 'off',
			'no-underscore-dangle': 'off',
			'no-restricted-syntax': [
				'error',
				{
					selector: 'ForInStatement',
					message:
						'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
				},
				{
					selector: 'LabeledStatement',
					message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
				},
				{
					selector: 'WithStatement',
					message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
				},
			],
			'no-spaced-func': 'off',
			'no-irregular-whitespace': 'error',
			'no-multiple-empty-lines': [
				'error',
				{
					max: 1,
				},
			],
			'one-var': ['error', 'never'],
			'no-cond-assign': ['error', 'except-parens'],
			'comma-dangle': 0,
			eqeqeq: [
				'error',
				'always',
				{
					null: 'ignore',
				},
			],
			'new-parens': ['error', 'always'],
			'no-caller': 'error',
			'no-constant-condition': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-duplicate-case': 'error',
			'no-eval': 'error',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'error',
			'no-fallthrough': 'error',
			'no-inner-declarations': 'error',
			'no-unused-labels': 'error',
			'no-proto': 'error',
			'no-redeclare': 'error',
			'no-regex-spaces': 'error',
			'no-self-compare': 'error',
			'no-sparse-arrays': 'error',
			'no-negated-in-lhs': 'error',
			'no-new-wrappers': 'error',
			'no-self-assign': 'error',
			'no-this-before-super': 'error',
			'no-with': 'error',
			'rest-spread-spacing': ['error', 'never'],
			'no-trailing-spaces': [
				'error',
				{
					ignoreComments: true,
				},
			],
			'no-undef-init': 'error',
			'no-unsafe-finally': 'error',
			'padded-blocks': ['error', 'never'],
			'space-in-parens': ['error', 'never'],
			'use-isnan': 'error',
			'valid-typeof': [
				'error',
				{
					requireStringLiterals: true,
				},
			],
			curly: ['error', 'all'],
			'handle-callback-err': ['error', '^error$'],
			'no-array-constructor': 'error',
			'no-unreachable': 'error',
			'no-multi-spaces': 'error',
			'no-unneeded-ternary': 'error',
			'no-param-reassign': [
				'error',
				{
					props: false,
				},
			],
			'no-continue': 'off',

			'sonarjs/no-duplicate-string': 'off',
			'sonarjs/no-identical-functions': 'off',
			'sonarjs/no-inverted-boolean-check': 'error',
			'sonarjs/cognitive-complexity': 'off',
			'sonarjs/no-hardcoded-passwords': 'off',

			'sort-imports': 'off',

			'import-x/no-unresolved': 'off',
			'import-x/prefer-default-export': 'off',
			'import-x/no-extraneous-dependencies': 'off',
			'import-x/extensions': 'off',
			'import-x/no-named-as-default': 'off',
			'import-x/no-named-as-default-member': 'off',

			'unicorn/prevent-abbreviations': [
				'warn',
				{
					checkFilenames: false,

					replacements: {
						env: false,
						props: false,
						ref: false,
					},
				},
			],
			'unicorn/no-useless-undefined': [
				'error',
				{
					checkArguments: false,
				},
			],
			'unicorn/consistent-function-scoping': [
				'error',
				{
					checkArrowFunctions: false,
				},
			],
			'unicorn/no-unused-properties': 'error',
			'unicorn/no-anonymous-default-export': 'off',
			'unicorn/filename-case': 'off',
			'unicorn/no-null': 'off',

			'prettier/prettier': 'error',
		},
	},
];
