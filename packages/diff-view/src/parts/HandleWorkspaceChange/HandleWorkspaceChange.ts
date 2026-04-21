import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { reloadContent } from '../LoadContent/LoadContent.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'

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
  const [leftResult, rightResult] = await loadFileContents(state.uriLeft, state.uriRight)
  const { content: contentLeft, errorMessage: errorLeftMessage, errorStack: errorLeftStack } = leftResult
  const { content: contentRight, errorMessage: errorRightMessage, errorStack: errorRightStack } = rightResult

  if (!hasFileChanged(state, contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack)) {
    return state
  }

  return reloadContent(state, contentLeft, contentRight, errorLeftMessage, errorLeftStack, errorRightMessage, errorRightStack)
}
