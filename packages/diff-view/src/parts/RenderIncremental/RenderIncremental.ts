import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: SourceControlState, newState: SourceControlState): any => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  const { id } = newState
  return ['Viewlet.setPatches', id, patches]
}
