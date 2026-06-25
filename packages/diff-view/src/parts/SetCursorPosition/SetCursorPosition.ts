import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const setCursorPosition = (state: DiffViewState, cursorColumnIndex: number, cursorRowIndex: number): DiffViewState => {
  return {
    ...state,
    rightEditor: {
      ...state.rightEditor,
      cursorColumnIndex,
      cursorRowIndex,
      selectionEnd: cursorColumnIndex,
      selectionStart: cursorColumnIndex,
    },
  }
}
