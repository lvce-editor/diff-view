import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as GetDiffEditorDom from '../GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

export const renderItems = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { id, initial } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetDiffEditorDom.getDiffEditorVirtualDom()
  return [ViewletCommand.SetDom2, id, dom]
}
