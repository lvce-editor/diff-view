import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const create2 = (
  id: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  workspacePath: string,
  platform: number,
  assetDir: string,
): void => {
  void uri
  const state: DiffViewState = {
    assetDir,
    focus: 0,
    height,
    id,
    minLineY: 0,
    platform,
    root: '',
    width,
    workspacePath,
    x,
    y,
  }
  SourceControlStates.set(id, state, state)
}
