import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffUris } from '../GetInlineDiffUris/GetInlineDiffUris.ts'
import { getMinLineY } from '../GetMinLineY/GetMinLineY.ts'
import { loadFileContents } from '../LoadFileContents/LoadFileContents.ts'
import { reloadContent } from '../ReloadContent/ReloadContent.ts'

export const loadContent = async (state: DiffViewState, savedState: unknown): Promise<DiffViewState> => {
  const { uri } = state
  const [uriLeft, uriRight] = getInlineDiffUris(uri)
  const { contentLeft, contentRight, errorLeftMessage, errorLeftCodeFrame, errorLeftStack, errorRightMessage, errorRightCodeFrame, errorRightStack } = await loadFileContents(
    uriLeft,
    uriRight,
  )
  const minLineY = getMinLineY(savedState)
  return reloadContent(
    { ...state, minLineY, uriLeft, uriRight },
    contentLeft,
    contentRight,
    errorLeftMessage,
    errorLeftCodeFrame,
    errorLeftStack,
    errorRightMessage,
    errorRightCodeFrame,
    errorRightStack,
  )
}
