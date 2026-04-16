interface RestoredState {
  readonly inputValue: string
}

const getRestoredInputValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'inputValue' in savedState && typeof savedState['inputValue'] === 'string') {
    return savedState.inputValue
  }
  return ''
}

export const restoreState = (savedState: unknown): RestoredState => {
  const inputValue = getRestoredInputValue(savedState)
  return { inputValue }
}
