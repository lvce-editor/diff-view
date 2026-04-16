import { ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const viewAsList = (state: SourceControlState): SourceControlState => {
  return {
    ...state,
    viewMode: ViewMode.List,
  }
}
