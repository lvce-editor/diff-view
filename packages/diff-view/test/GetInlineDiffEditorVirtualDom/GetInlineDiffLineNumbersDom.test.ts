import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../src/parts/ClassNames/ClassNames.ts'
import { getInlineDiffLineNumbersDom } from '../../src/parts/GetInlineDiffEditorVirtualDom/GetInlineDiffLineNumbersDom/GetInlineDiffLineNumbersDom.ts'

test('getInlineDiffLineNumbersDom renders the gutter and line numbers', (): void => {
  const result = getInlineDiffLineNumbersDom([
    {
      lineNumberLeft: 7,
      lineNumberRight: null,
      text: 'deleted',
      type: 'deletion',
    },
  ])

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('7 -'),
  ])
})
