import { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export interface Renderer {
  (oldState: DiffViewState, newState: DiffViewState): readonly any[]
}
