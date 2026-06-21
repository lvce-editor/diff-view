import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

const getLines = (content: string): readonly string[] => {
  if (!content) {
    return ['']
  }
  return content.split('\n')
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const setCursor = (state: DiffViewState, cursorColumnIndex: number, cursorRowIndex: number): DiffViewState => {
  const lines = getLines(state.contentRight)
  const nextCursorRowIndex = clamp(cursorRowIndex, 0, lines.length - 1)
  const nextCursorColumnIndex = clamp(cursorColumnIndex, 0, lines[nextCursorRowIndex].length)
  if (state.rightEditor.cursorColumnIndex === nextCursorColumnIndex && state.rightEditor.cursorRowIndex === nextCursorRowIndex) {
    return state
  }
  return {
    ...state,
    rightEditor: {
      ...state.rightEditor,
      cursorColumnIndex: nextCursorColumnIndex,
      cursorRowIndex: nextCursorRowIndex,
    },
  }
}

export const moveCursorLeft = (state: DiffViewState): DiffViewState => {
  const { cursorColumnIndex, cursorRowIndex } = state.rightEditor
  if (cursorColumnIndex > 0) {
    return setCursor(state, cursorColumnIndex - 1, cursorRowIndex)
  }
  if (cursorRowIndex <= 0) {
    return state
  }
  const lines = getLines(state.contentRight)
  const previousRowIndex = cursorRowIndex - 1
  return setCursor(state, lines[previousRowIndex].length, previousRowIndex)
}

export const moveCursorRight = (state: DiffViewState): DiffViewState => {
  const lines = getLines(state.contentRight)
  const cursorRowIndex = clamp(state.rightEditor.cursorRowIndex, 0, lines.length - 1)
  const cursorColumnIndex = clamp(state.rightEditor.cursorColumnIndex, 0, lines[cursorRowIndex].length)
  if (cursorColumnIndex < lines[cursorRowIndex].length) {
    return setCursor(state, cursorColumnIndex + 1, cursorRowIndex)
  }
  if (cursorRowIndex >= lines.length - 1) {
    return state
  }
  return setCursor(state, 0, cursorRowIndex + 1)
}

export const moveCursorUp = (state: DiffViewState): DiffViewState => {
  return setCursor(state, state.rightEditor.cursorColumnIndex, state.rightEditor.cursorRowIndex - 1)
}

export const moveCursorDown = (state: DiffViewState): DiffViewState => {
  return setCursor(state, state.rightEditor.cursorColumnIndex, state.rightEditor.cursorRowIndex + 1)
}

export const moveCursorToStartOfLine = (state: DiffViewState): DiffViewState => {
  return setCursor(state, 0, state.rightEditor.cursorRowIndex)
}

export const moveCursorToEndOfLine = (state: DiffViewState): DiffViewState => {
  const lines = getLines(state.contentRight)
  const cursorRowIndex = clamp(state.rightEditor.cursorRowIndex, 0, lines.length - 1)
  return setCursor(state, lines[cursorRowIndex].length, cursorRowIndex)
}
