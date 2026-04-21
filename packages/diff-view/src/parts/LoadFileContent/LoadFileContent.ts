import type { LoadedFileContent } from '../LoadedFileContent/LoadedFileContent.ts'
import { getErrorMessage } from '../GetErrorMessage/GetErrorMessage.ts'
import { getErrorStack } from '../GetErrorStack/GetErrorStack.ts'
import { readFile } from '../ReadFile/ReadFile.ts'

export const loadFileContent = async (uri: string): Promise<LoadedFileContent> => {
  try {
    const content = await readFile(uri)
    return {
      content,
      errorMessage: '',
      errorStack: '',
    }
  } catch (error) {
    return {
      content: '',
      errorMessage: getErrorMessage(error),
      errorStack: getErrorStack(error),
    }
  }
}
