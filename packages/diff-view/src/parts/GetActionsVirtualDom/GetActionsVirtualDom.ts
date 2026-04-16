import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetActionVirtualDom from '../GetActionVirtualDom/GetActionVirtualDom.ts'

export const getActionsVirtualDom = (actions: readonly Action[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: actions.length,
      className: ClassNames.Actions,
      onClick: DomEventListenerFunctions.HandleClickAction,
      role: AriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    ...actions.flatMap(GetActionVirtualDom.getActionVirtualDom),
  ]
}
