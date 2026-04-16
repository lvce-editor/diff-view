import { ViewMode } from '@lvce-editor/constants'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const viewAsTree = (state: DiffViewState): DiffViewState => {
  return {
    ...state,
    viewMode: ViewMode.Tree,
  }
}
