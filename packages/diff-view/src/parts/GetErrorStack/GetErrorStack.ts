export const getErrorStack = (error: unknown): string => {
  if (error instanceof Error && error.stack) {
    return error.stack
  }
  return ''
}
