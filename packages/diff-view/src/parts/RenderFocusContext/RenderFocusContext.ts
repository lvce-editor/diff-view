import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const renderFocusContext = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { focus, id } = newState
  return [ViewletCommand.SetFocusContext, id, focus]
}
