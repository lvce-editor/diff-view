import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
<<<<<<< HEAD
import { getContentDom } from '../GetContentDom/GetContentDom.ts'

<<<<<<< HEAD
export const getContentLeftDom = (contentLeft: string, errorMessage = '', errorStack = ''): readonly VirtualDomNode[] => {
  return getContentDom(ClassNames.DiffEditorContentLeft, contentLeft, errorMessage, errorStack)
=======
import { getVisibleRows } from '../GetVisibleRows/GetVisibleRows.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'

export const getContentLeftDom = (contentLeft: string, totalLineCount: number, minLineY: number, maxLineY: number): readonly VirtualDomNode[] => {
  const lines = getVisibleRows(contentLeft, totalLineCount, minLineY, maxLineY)
  const rows = getRowsDom(lines)

  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lines.length + 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    ...rows,
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ]
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
=======
export const getContentLeftDom = (contentLeft: string, errorMessage = '', errorStack = '', lineNumbers = true): readonly VirtualDomNode[] => {
  return getContentDom(ClassNames.DiffEditorContentLeft, contentLeft, errorMessage, errorStack, lineNumbers)
>>>>>>> origin/main
}
