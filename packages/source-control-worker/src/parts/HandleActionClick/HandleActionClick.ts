import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as InputName from '../InputName/InputName.ts'
import * as Logger from '../Logger/Logger.ts'
import { refresh } from '../Refresh/Refresh.ts'
import { viewAsTree } from '../ViewAsTree/ViewAsTree.ts'

export const handleActionClick = async (state: SourceControlState, actionName: string): Promise<SourceControlState> => {
  switch (actionName) {
    case InputName.CommitAndPush:
      Logger.warn(`[source-control-worker] CommitAndPush action not yet implemented`)
      return state
    case InputName.Refresh:
      return refresh(state)
    case InputName.ViewAsTree:
      return viewAsTree(state)
    default:
      Logger.warn(`[source-control-worker] Unknown action name: ${actionName}`)
      return state
  }
}
