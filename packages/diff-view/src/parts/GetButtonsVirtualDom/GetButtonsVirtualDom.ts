import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getButtonVirtualDom } from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'

export const getButtonsVirtualDom = (buttons: readonly ActionButton[]): readonly VirtualDomNode[] => {
  if (buttons === EmptySourceControlButtons.emptySourceControlButtons) {
    return []
  }
  return [
    {
      childCount: buttons.length,
      className: ClassNames.SourceControlButtons,
      type: VirtualDomElements.Div,
    },
    ...buttons.flatMap(getButtonVirtualDom),
  ]
}
