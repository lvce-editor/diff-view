import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getStackLineHref } from '../GetStackLineHref/GetStackLineHref.ts'
import { getStackLineLabel } from '../GetStackLineLabel/GetStackLineLabel.ts'
import { getStackLineLocation } from '../GetStackLineLocation/GetStackLineLocation.ts'
import { getStackLinePrefix } from '../GetStackLinePrefix/GetStackLinePrefix.ts'

export const getErrorStackLineDom = (stackLine: string, allowedLinkSchemes: readonly string[]): readonly VirtualDomNode[] => {
  const location = getStackLineLocation(stackLine)
  if (!location) {
    return [
      {
        childCount: 1,
        type: VirtualDomElements.Div,
      },
      text(stackLine),
    ]
  }
  const prefix = getStackLinePrefix(stackLine)
  const href = getStackLineHref(location, allowedLinkSchemes)
  const label = getStackLineLabel(location)
  return [
    {
      childCount: prefix ? 2 : 1,
      type: VirtualDomElements.Div,
    },
    ...(prefix ? [text(prefix)] : []),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href,
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text(label),
  ]
}
