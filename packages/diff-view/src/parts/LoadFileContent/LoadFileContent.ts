import type { LoadedFileContent } from '../LoadedFileContent/LoadedFileContent.ts'
import { prepareError } from '../PrepareError/PrepareError.ts'
import { readFile } from '../ReadFile/ReadFile.ts'

export const loadFileContent = async (uri: string): Promise<LoadedFileContent> => {
  try {
    const content = await readFile(uri)
    return {
      content,
      errorCodeFrame: '',
      errorMessage: '',
      errorStack: '',
    }
  } catch (error) {
    const prettyError = await prepareError(error)
    return {
      content: '',
      errorCodeFrame: prettyError.codeFrame,
      errorMessage: prettyError.message,
      errorStack: prettyError.stack,
    }
  }
}
