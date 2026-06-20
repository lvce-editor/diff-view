import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionName from '../ActionName/ActionName.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getDiffModeToggleDom = (diffMode: DiffMode): readonly VirtualDomNode[] => {
  const label = diffMode === 'inline' ? 'Side by side' : 'Inline'
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorModeToggle,
      name: ActionName.ToggleDiffMode,
      onClick: DomEventListenerFunctions.HandleClickAction,
      title: `Switch to ${label} diff`,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
