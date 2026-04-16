import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: DiffViewState, newState: DiffViewState, diffResult: readonly number[]): readonly any[] => {
  const commands = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    const result = fn(oldState, newState)
    if (result.length > 0) {
      commands.push(result)
    }
  }
  return commands
}
