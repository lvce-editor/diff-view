import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'
import { reloadContent } from '../ReloadContent/ReloadContent.ts'

const hasFileChanged = (
  state: DiffViewState,
  contentLeft: string,
  contentRight: string,
  errorLeftMessage: string,
  errorLeftStack: string,
  errorRightMessage: string,
  errorRightStack: string,
): boolean => {
  return (
    state.contentLeft !== contentLeft ||
    state.contentRight !== contentRight ||
    state.errorLeftMessage !== errorLeftMessage ||
    state.errorLeftStack !== errorLeftStack ||
    state.errorRightMessage !== errorRightMessage ||
    state.errorRightStack !== errorRightStack
  )
}

export const handleWorkspaceChange = async (state: DiffViewState): Promise<DiffViewState> => {
  const { contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack } = await loadFileContents(state.uriLeft, state.uriRight)

  if (!hasFileChanged(state, contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack)) {
    return state
  }

  return reloadContent(state, contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack)
}
