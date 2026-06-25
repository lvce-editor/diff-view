import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
]
