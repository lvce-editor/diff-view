import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getInlineDiffRowDom } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffRowDom/GetInlineDiffRowDom.ts'

test('getInlineDiffRowDom renders a context row', (): void => {
  const result = getInlineDiffRowDom({
    lineNumberLeft: 3,
    lineNumberRight: 3,
    text: 'same line',
    type: 'context',
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('  same line'),
  ])
})

test('getInlineDiffRowDom renders a deletion row', (): void => {
  const result = getInlineDiffRowDom({
    lineNumberLeft: 3,
    lineNumberRight: null,
    text: 'removed line',
    type: 'deletion',
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRowDeletion,
      type: VirtualDomElements.Div,
    },
    text('- removed line'),
  ])
})

test('getInlineDiffRowDom renders an insertion row', (): void => {
  const result = getInlineDiffRowDom({
    lineNumberLeft: null,
    lineNumberRight: 4,
    text: 'added line',
    type: 'insertion',
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    text('+ added line'),
  ])
})
