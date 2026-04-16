import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const renderFocusContext = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { focus, id } = newState
  return [ViewletCommand.SetFocusContext, id, focus]
}
