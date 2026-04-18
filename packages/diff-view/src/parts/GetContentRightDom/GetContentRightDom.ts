import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'

export const getContentRightDom = (
  contentRight: string,
  errorMessage = '',
  errorStack = '',
  lineNumbers = true,
  totalLineCount = contentRight ? contentRight.split('\n').length : 1,
  minLineY = 0,
  maxLineY = totalLineCount,
): readonly VirtualDomNode[] => {
  return getContentDom(ClassNames.DiffEditorContentRight, contentRight, errorMessage, errorStack, lineNumbers, totalLineCount, minLineY, maxLineY)
}
}
