import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlHeaderVirtualDom from '../GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as GetSourceControlListVirtualDom from '../GetSourceControlListVirtualDom/GetSourceControlListVirtualDom.ts'
import * as GetSplitButtonVirtualDom from '../GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.SourceControl)

export const getSourceControlVirtualDom = (items: readonly VisibleItem[], splitButtonEnabled: boolean, inputPlaceholder: string): readonly VirtualDomNode[] => {
  const hasItems = items.length > 0
  const dom = [
    {
      childCount: splitButtonEnabled ? 3 : 2,
      className: className,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onMouseOver: DomEventListenerFunctions.HandleMouseOver,
      // onMouseOut: DomEventListenerFunctions.HandleMouseOut,
      onWheel: DomEventListenerFunctions.HandleWheel,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom(inputPlaceholder),
    ...GetSplitButtonVirtualDom.getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit'),
    ...GetSourceControlListVirtualDom.getSourceControlListVirtualDom(items),
  ]
  return dom
}
