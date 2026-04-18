import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getDiffEditorVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor2}`,
      type: VirtualDomElements.Div,
    },
    text('hello world'),
  ]
  return dom
}
