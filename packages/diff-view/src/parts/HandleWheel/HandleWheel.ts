import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = async (state: DiffViewState, deltaMode: number, deltaY: number): Promise<DiffViewState> => {
  return setDeltaY(state, state.deltaY + deltaY)
}
