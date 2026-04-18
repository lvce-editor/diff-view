import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss renders left and right widths as css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
    leftWidth: 120,
    rightWidth: 176,
  }

  const result = renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    1,
    `
:root {
  --LeftWidth: 120px;
  --RightWidth: 176px;
}

.DiffEditor {
  display: flex;
}

.DiffEditorContent {
  contain: strict;
  overflow: hidden;
}

.DiffEditorContentLeft {
  width: var(--LeftWidth);
}

.DiffEditorContentRight {
  width: var(--RightWidth);
}

.Sash {
  cursor: col-resize;
  flex-shrink: 0;
  width: 4px;
}
`,
  ])
})
