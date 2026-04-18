import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as CreateDefaultState from '../CreateDefaultState/CreateDefaultState.ts'
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
  const state: DiffViewState = {
    ...CreateDefaultState.createDefaultState(),
    assetDir,
    height,
    id,
    initial: true,
    platform,
    uri,
    width,
    workspacePath,
    x,
    y,
  }
  DiffViewStates.set(id, state, state)
}
