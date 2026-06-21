import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionName from '../ActionName/ActionName.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiffStrings from '../DiffStrings/DiffStrings.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const getLabel = (showWhitespace: boolean): string => {
  return showWhitespace ? DiffStrings.hideWhitespace() : DiffStrings.showWhitespace()
}

export const getWhitespaceToggleDom = (showWhitespace: boolean): readonly VirtualDomNode[] => {
  const label = getLabel(showWhitespace)
  const className = showWhitespace ? `${ClassNames.DiffEditorWhitespaceToggle} ${ClassNames.DiffEditorWhitespaceToggleActive}` : ClassNames.DiffEditorWhitespaceToggle
  return [
    {
      childCount: 1,
      className,
      name: ActionName.ToggleWhitespace,
      onClick: DomEventListenerFunctions.HandleClickAction,
      title: label,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
