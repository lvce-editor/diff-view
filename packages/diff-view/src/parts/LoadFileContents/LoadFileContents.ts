import type { LoadedFileContents } from '../LoadedFileContents/LoadedFileContents.ts'
import { loadFileContent } from '../LoadFileContent/LoadFileContent.ts'

export const loadFileContents = async (uriLeft: string, uriRight: string): Promise<LoadedFileContents> => {
  const [leftResult, rightResult] = await Promise.all([loadFileContent(uriLeft), loadFileContent(uriRight)])

  return {
    contentLeft: leftResult.content,
    contentRight: rightResult.content,
    errorLeftCodeFrame: leftResult.errorCodeFrame,
    errorLeftMessage: leftResult.errorMessage,
    errorLeftStack: leftResult.errorStack,
    errorRightCodeFrame: rightResult.errorCodeFrame,
    errorRightMessage: rightResult.errorMessage,
    errorRightStack: rightResult.errorStack,
  }
}
