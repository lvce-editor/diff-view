import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  ...config.recommendedRegex,
  ...config.recommendedActions,
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
]
