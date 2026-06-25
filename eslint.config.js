import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
  ...actions.default,
  ...regex.default,
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
]
