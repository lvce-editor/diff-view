import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getInlineDiffLineNumberDom } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffLineNumberDom/GetInlineDiffLineNumberDom.ts'

test('getInlineDiffLineNumberDom renders the line number cell', (): void => {
  const result = getInlineDiffLineNumberDom({
    lineNumberLeft: 7,
    lineNumberRight: null,
    text: 'deleted',
    type: 'deletion',
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('7 -'),
  ])
})
