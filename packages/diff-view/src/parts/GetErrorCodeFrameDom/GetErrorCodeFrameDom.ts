import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const errorCodeFrameLineNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Div,
}

export const getErrorCodeFrameDom = (codeFrame: string): readonly VirtualDomNode[] => {
  if (!codeFrame) {
    return []
  }
  const lines = codeFrame.split('\n')
  return [
    {
      childCount: lines.length,
      className: ClassNames.DiffEditorErrorCodeFrame,
      type: VirtualDomElements.Div,
    },
    ...lines.flatMap((line) => [errorCodeFrameLineNode, text(line)]),
  ]
}
