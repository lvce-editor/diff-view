import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedRegex,
  ...config.recommendedActions,
  {
    files: [
      'packages/diff-view/src/parts/{ApplyEditInput,CursorConstants,DeleteLeft,DeleteRight,GetCursorPositionFromCoordinates,GetNextPaneSizes,HandleBeforeInput,HandleClickAt,HandleClickRightSide,HandleContextMenu,HandleResize,HandleSashPointerUp,HandleScrollBarPointerDown,HandleScrollBarPointerMove,HandleWheel,HandleWorkspaceChange,Initialize,InsertLineBreak,MoveCursor,SetCursorPosition,SetDiffMode,SetFontFamily,SetLayout,ToggleDiffMode,ToggleWhitespace}/**/*.ts',
    ],
    rules: {
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: ['packages/diff-view/src/parts/{GetImageLeftDom,GetImageRightDom}/**/*.ts'],
    rules: {
      'virtual-dom/clickable-div-needs-role': 'off',
    },
  },
  {
    files: ['packages/diff-view/test/**/*.ts'],
    rules: {
      'virtual-dom/clickable-div-needs-role': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/{e2e,e2e-integration}/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
      'e2e/prefer-filesystem-set-files': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // The application runner supplies mutable API objects to these scenarios.
    files: ['packages/e2e-integration/src/**/*.ts'],
    rules: { '@typescript-eslint/prefer-readonly-parameter-types': 'off' },
  },
  {
    // The application runner supplies mutable API objects to these scenarios.
    files: ['packages/e2e-integration/src/**/*.ts'],
    rules: { '@typescript-eslint/prefer-readonly-parameter-types': 'off' },
  },
])
