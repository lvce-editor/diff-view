import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ClassNames, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = mergeClassNames(ClassNames.Badge, ClassNames.SourceControlBadge)

const parentNode: VirtualDomNode = {
  childCount: 1,
  className,
  type: VirtualDomElements.Div,
}

export const getBadgeVirtualDom = (count: number): readonly VirtualDomNode[] => {
  return [parentNode, text(`${count}`)]
}
