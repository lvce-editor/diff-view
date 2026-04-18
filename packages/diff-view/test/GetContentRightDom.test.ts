import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getContentRightDom } from '../src/parts/GetContentRightDom/GetContentRightDom.ts'

test('getContentRightDom renders each right line inside an EditorRow', (): void => {
  const result = getContentRightDom('after-content\nsecond-line', 2, 0, 2)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
<<<<<<< HEAD
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
=======
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
>>>>>>> origin/main
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
=======
    text('second-line'),
>>>>>>> origin/main
  ])
})

test('getContentRightDom renders load errors when available', (): void => {
  const result = getContentRightDom('', 'permission denied', '')

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: `${ClassNames.DiffEditorContentRight} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text('permission denied'),
  ])
})
