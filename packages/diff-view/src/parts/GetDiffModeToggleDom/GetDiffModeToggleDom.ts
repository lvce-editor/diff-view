import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import * as ActionName from '../ActionName/ActionName.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiffStrings from '../DiffStrings/DiffStrings.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const getLabel = (diffMode: DiffMode): string => {
  return diffMode === 'inline' ? DiffStrings.sideBySide() : DiffStrings.inline()
}

const getTitle = (diffMode: DiffMode): string => {
  const label = getLabel(diffMode)
  return DiffStrings.switchToDiff(label)
}

export const getDiffModeToggleDom = (diffMode: DiffMode): readonly VirtualDomNode[] => {
  const label = getLabel(diffMode)
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorModeToggle,
      name: ActionName.ToggleDiffMode,
      onClick: DomEventListenerFunctions.HandleClickAction,
      title: getTitle(diffMode),
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
