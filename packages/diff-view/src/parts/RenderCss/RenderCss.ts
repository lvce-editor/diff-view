import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { id } = newState
  const css = `

`
  return [ViewletCommand.SetCss, id, css]
}
