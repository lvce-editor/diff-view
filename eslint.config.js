import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config,
  ...actions,
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
  {
    ignores: ['**/fixtures/**'],
  },
]
