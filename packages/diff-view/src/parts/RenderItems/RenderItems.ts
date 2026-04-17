import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { id, initial } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetSourceControlDom.getSourceControlVirtualDom()
  return [ViewletCommand.SetDom2, id, dom]
}
