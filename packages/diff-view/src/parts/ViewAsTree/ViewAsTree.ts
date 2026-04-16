import { ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const viewAsTree = (state: SourceControlState): SourceControlState => {
  return {
    ...state,
    viewMode: ViewMode.Tree,
  }
}
