import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss exposes gutter width as a css variable and uses it for gutter sizing', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    gutterWidthVariable: 27,
    id: 1,
  }

  const result = renderCss(oldState, newState)

  expect(result[2]).toContain('--GutterWidth: 27px;')
  expect(result[2]).toContain('width: calc(var(--GutterWidth) + 20px);')
  expect(result[2]).toContain('.InlineDiffEditor .DiffEditorGutter {')
})
