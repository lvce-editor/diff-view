import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

const getContentLeftDom = (contentLeft: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: 'DiffEditorContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'DiffEditorContentLeft',
      type: VirtualDomElements.Div,
    },
    text(contentLeft),
  ]
}

const getContentRightDom = (contentRight: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: 'DiffEditorContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'DiffEditorContentRight',
      type: VirtualDomElements.Div,
    },
    text(contentRight),
  ]
}

export const getDiffEditorVirtualDom = (contentLeft: string, contentRight: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: 'Viewlet DiffEditor',
      type: VirtualDomElements.Div,
    },
    ...getContentLeftDom(contentLeft),
    ...getContentRightDom(contentRight),
  ]
  return dom
}
