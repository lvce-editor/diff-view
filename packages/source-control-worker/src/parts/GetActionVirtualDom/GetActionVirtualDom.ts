import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as GetActionButtonVirtualDom from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

export const getActionVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  switch (action.type) {
    case ActionType.Button: {
      const actionButton: ActionButton = {
        command: action.command,
        icon: action.icon,
        id: action.id,
        label: action.name,
      }
      return GetActionButtonVirtualDom.getActionButtonVirtualDom(actionButton)
    }
    default:
      return []
  }
}
