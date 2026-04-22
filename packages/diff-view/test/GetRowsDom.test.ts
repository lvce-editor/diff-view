import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getRowsDom } from '../src/parts/GetContentDomWithLineNumbers/GetRowsDom/GetRowsDom.ts'

test('getRowsDom renders the rows container and spacers', (): void => {
  const result = getRowsDom(4, [
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('row-1'),
  ])

  expect(result).toEqual([
    {
      childCount: 4,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('row-1'),
  ])
})
