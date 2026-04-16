import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export interface Renderer {
  (oldState: SourceControlState, newState: SourceControlState): readonly any[]
}
