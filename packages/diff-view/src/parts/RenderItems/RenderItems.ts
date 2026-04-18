import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as GetDiffEditorDom from '../GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

export const renderItems = (oldState: DiffViewState, newState: DiffViewState): any => {
<<<<<<< HEAD
  const { id, initial } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetDiffEditorDom.getDiffEditorVirtualDom(newState)
=======
  const { contentLeft, contentRight, id, initial, renderModeLeft, renderModeRight, uriLeft, uriRight } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetDiffEditorDom.getDiffEditorVirtualDom(contentLeft, contentRight, renderModeLeft, renderModeRight, uriLeft, uriRight)
>>>>>>> origin/main
  return [ViewletCommand.SetDom2, id, dom]
}
