import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const setSelection = (state: DiffViewState, selectionStart: number, selectionEnd: number): DiffViewState => {
  return {
    ...state,
    rightEditor: {
      ...state.rightEditor,
      selectionStart,
      selectionEnd,
      // keep cursor in sync with selection end for now
      cursorColumnIndex: selectionEnd,
    },
  }
}
