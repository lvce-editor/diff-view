import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id, inputValue } = newState
  return [ViewletCommand.SetValueByName, id, InputName.SourceControlInput, inputValue]
}
