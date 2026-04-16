import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import * as Logger from '../Logger/Logger.ts'
import { refresh } from '../Refresh/Refresh.ts'

export const handleClickSourceControlButtons = async (state: SourceControlState, index: number, name: string): Promise<SourceControlState> => {
  const { visibleItems } = state
  const item = visibleItems[index]
  if (!item) {
    return state
  }
  const { buttons } = item
  const button = buttons.find((button) => button.label === name)
  if (!button) {
    Logger.warn(`[source-control-worker] Button not found ${name}`)
    return state
  }
  const { file } = item
  await ExtensionHostCommand.executeCommand(button.command, state.assetDir, state.platform, file)
  const newState = await refresh(state)
  return newState
}
