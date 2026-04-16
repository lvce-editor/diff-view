import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = async (state: SourceControlState, deltaMode: number, deltaY: number): Promise<SourceControlState> => {
  return setDeltaY(state, state.deltaY + deltaY)
}
