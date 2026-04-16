import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DiffViewStates from '../DiffViewStates/DiffViewStates.ts'

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
  DiffViewStates.set(id, state, state)
}
