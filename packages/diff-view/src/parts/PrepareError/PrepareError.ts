import { ErrorWorker } from '@lvce-editor/rpc-registry'
import type { PrettyError } from '../PrettyError/PrettyError.ts'
import { getErrorMessage } from '../GetErrorMessage/GetErrorMessage.ts'
import { getErrorStack } from '../GetErrorStack/GetErrorStack.ts'

interface PreparedErrorLike {
  readonly codeFrame?: unknown
  readonly codeframe?: unknown
  readonly message?: unknown
  readonly stack?: unknown
}

const getString = (value: unknown): string => {
  return typeof value === 'string' ? value : ''
}

const getCodeFrame = (preparedError: PreparedErrorLike): string => {
  return getString(preparedError.codeFrame) || getString(preparedError.codeframe)
}

const normalizePreparedError = (error: unknown, preparedError: unknown): PrettyError => {
  const fallbackMessage = getErrorMessage(error)
  const fallbackStack = getErrorStack(error)
  if (!preparedError || typeof preparedError !== 'object') {
    return {
      codeFrame: '',
      message: fallbackMessage,
      stack: fallbackStack,
    }
  }
  const errorLike = preparedError as PreparedErrorLike
  return {
    codeFrame: getCodeFrame(errorLike),
    message: getString(errorLike.message) || fallbackMessage,
    stack: getString(errorLike.stack) || fallbackStack,
  }
}

export const prepareError = async (error: unknown): Promise<PrettyError> => {
  try {
    const preparedError = await ErrorWorker.invoke('Errors.prepare', error)
    return normalizePreparedError(error, preparedError)
  } catch {
    return normalizePreparedError(error, undefined)
  }
}
