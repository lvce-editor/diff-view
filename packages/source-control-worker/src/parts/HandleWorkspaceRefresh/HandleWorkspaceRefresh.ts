import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { refresh } from '../Refresh/Refresh.ts'

export const handleWorkspaceRefresh = async (state: SourceControlState): Promise<SourceControlState> => {
  return refresh(state)
}
