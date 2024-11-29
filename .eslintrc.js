require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
	extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
	parserOptions: { tsconfigRootDir: __dirname },
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 2018,
				sourceType: 'module',
			},
			rules: {
				'@rushstack/no-new-null': 1,
				'@rushstack/hoist-jest-mock': 1,
				'@rushstack/security/no-unsafe-regexp': 1,
				'@typescript-eslint/adjacent-overload-signatures': 1,
				'@typescript-eslint/explicit-function-return-type': [
					1,
					{
						allowExpressions: true,
						allowTypedFunctionExpressions: true,
						allowHigherOrderFunctions: false,
					},
				],
				'@typescript-eslint/explicit-member-accessibility': 0,
				'@typescript-eslint/no-array-constructor': 1,
				'@typescript-eslint/no-explicit-any': 0,
				'@typescript-eslint/no-floating-promises': 2,
				'@typescript-eslint/no-for-in-array': 2,
				'@typescript-eslint/no-misused-new': 2,
				'@typescript-eslint/no-namespace': [
					1,
					{
						allowDeclarations: false,
						allowDefinitionFiles: false,
					},
				],
				'@typescript-eslint/parameter-properties': 0,
				'@typescript-eslint/no-unused-vars': [
					2,
					{
						vars: 'all',
						args: 'none',
					},
				],
				'@typescript-eslint/no-use-before-define': [
					2,
					{
						functions: false,
						classes: true,
						variables: true,
						enums: true,
						typedefs: true,
					},
				],
				'@typescript-eslint/no-var-requires': 'error',
				'@typescript-eslint/prefer-namespace-keyword': 2,
				'@typescript-eslint/no-inferrable-types': 0,
				'@typescript-eslint/no-empty-interface': 0,
				'accessor-pairs': 2,
				'dot-notation': [
					1,
					{
						allowPattern: '^_',
					},
				],
				eqeqeq: 1,
				'for-direction': 1,
				'guard-for-in': 2,
				'max-lines': ['warn', { max: 2000 }],
				'no-async-promise-executor': 2,
				'no-caller': 2,
				'no-compare-neg-zero': 2,
				'no-cond-assign': 2,
				'no-constant-condition': 1,
				'no-control-regex': 2,
				'no-debugger': 1,
				'no-delete-var': 2,
				'no-duplicate-case': 2,
				'no-empty': 1,
				'no-empty-character-class': 2,
				'no-empty-pattern': 1,
				'no-eval': 1,
				'no-ex-assign': 2,
				'no-extend-native': 1,
				'no-extra-label': 1,
				'no-fallthrough': 2,
				'no-func-assign': 1,
				'no-implied-eval': 2,
				'no-invalid-regexp': 2,
				'no-label-var': 2,
				'no-lone-blocks': 1,
				'no-misleading-character-class': 2,
				'no-multi-str': 2,
				'no-new': 2,
				'no-new-func': 2,
				'no-new-object': 2,
				'no-new-wrappers': 1,
				'no-octal': 2,
				'no-octal-escape': 2,
				'no-regex-spaces': 2,
				'no-return-assign': 2,
				'no-script-url': 2,
				'no-self-assign': 2,
				'no-self-compare': 2,
				'no-sequences': 1,
				'no-shadow-restricted-names': 2,
				'no-sparse-arrays': 2,
				'no-throw-literal': 2,
				'no-unmodified-loop-condition': 2,
				'no-unsafe-finally': 2,
				'no-unused-expressions': 2,
				'no-unused-labels': 1,
				'no-useless-catch': 2,
				'no-useless-concat': 1,
				'no-var': 2,
				'no-void': 1,
				'no-with': 2,
				'prefer-const': 0,
				'promise/param-names': 2,
				'require-atomic-updates': 2,
				'require-yield': 1,
				strict: [2, 'never'],
				'use-isnan': 2,
				'no-extra-boolean-cast': 0,
				// ====================================================================
				// @microsoft/eslint-plugin-spfx
				// ====================================================================
				'@microsoft/spfx/import-requires-chunk-name': 1,
				'@microsoft/spfx/no-require-ensure': 2,
				'@microsoft/spfx/pair-react-dom-render-unmount': 1,
			},
		},
		{
			// For unit tests, we can be a little bit less strict.  The settings below revise the
			// defaults specified in the extended configurations, as well as above.
			files: [
				// Test files
				'*.test.ts',
				'*.test.tsx',
				'*.spec.ts',
				'*.spec.tsx',

				// Facebook convention
				'**/__mocks__/*.ts',
				'**/__mocks__/*.tsx',
				'**/__tests__/*.ts',
				'**/__tests__/*.tsx',

				// Microsoft convention
				'**/test/*.ts',
				'**/test/*.tsx',
			],
			rules: {},
		},
	],
};
