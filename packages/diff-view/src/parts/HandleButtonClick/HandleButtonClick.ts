import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

export const handleButtonClick = async (state: DiffViewState, clickedIndex: number): Promise<DiffViewState> => {
  const { visibleItems } = state
  const item = visibleItems[clickedIndex]
  const button = item.buttons[clickedIndex]
  if (!button) {
    return state
  }
  await ExtensionHostCommand.executeCommand(button.command, state.assetDir, state.platform, item.file)
  const newState = await loadContent(state, {})
  return newState
}
