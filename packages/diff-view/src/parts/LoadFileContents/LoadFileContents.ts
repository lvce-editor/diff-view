import { readFile } from '../ReadFile/ReadFile.ts'

export interface LoadedFileContent {
  readonly content: string
  readonly errorMessage: string
  readonly errorStack: string
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

const getErrorStack = (error: unknown): string => {
  if (error instanceof Error && error.stack) {
    return error.stack
  }
  return ''
}

const loadFileContent = async (uri: string): Promise<LoadedFileContent> => {
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

export const loadFileContents = async (uriLeft: string, uriRight: string): Promise<readonly [LoadedFileContent, LoadedFileContent]> => {
  return Promise.all([loadFileContent(uriLeft), loadFileContent(uriRight)])
}
