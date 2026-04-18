import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'

export const getContentDom = (contentClassName: string, content: string, errorMessage: string, errorStack: string): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorStack)
  }
  const lines = content.split('\n')
  const rows = getRowsDom(lines)

  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lines.length,
      className: contentClassName,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
