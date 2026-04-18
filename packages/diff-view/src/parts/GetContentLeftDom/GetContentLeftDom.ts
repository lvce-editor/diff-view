import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

export const getContentLeftDom = (contentLeft: string, errorMessage = '', errorStack = ''): readonly VirtualDomNode[] => {
  return getContentDom(ClassNames.DiffEditorContentLeft, contentLeft, errorMessage, errorStack)
}
