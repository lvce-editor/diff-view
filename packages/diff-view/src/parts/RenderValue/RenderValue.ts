import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { id, inputValue } = newState
  return [ViewletCommand.SetValueByName, id, InputName.SourceControlInput, inputValue]
}
