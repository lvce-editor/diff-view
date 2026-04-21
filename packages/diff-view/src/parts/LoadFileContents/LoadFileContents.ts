import { loadFileContent } from '../LoadFileContent/LoadFileContent.ts'

export interface LoadedFileContents {
  readonly contentLeft: string
  readonly contentRight: string
  readonly errorLeftMessage: string
  readonly errorLeftStack: string
  readonly errorRightMessage: string
  readonly errorRightStack: string
}

export const loadFileContents = async (uriLeft: string, uriRight: string): Promise<LoadedFileContents> => {
  const [leftResult, rightResult] = await Promise.all([loadFileContent(uriLeft), loadFileContent(uriRight)])

  return {
    contentLeft: leftResult.content,
    contentRight: rightResult.content,
    errorLeftMessage: leftResult.errorMessage,
    errorLeftStack: leftResult.errorStack,
    errorRightMessage: rightResult.errorMessage,
    errorRightStack: rightResult.errorStack,
  }
}
