import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { refresh } from '../Refresh/Refresh.ts'

export const handleWorkspaceRefresh = async (state: DiffViewState): Promise<DiffViewState> => {
  return refresh(state)
}
