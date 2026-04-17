import type { DiffViewState } from '../DiffViewState/DiffViewState.js'

export interface Renderer {
  (oldState: DiffViewState, newState: DiffViewState): readonly any[]
}
