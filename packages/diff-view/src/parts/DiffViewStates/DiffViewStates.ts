import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

const registry = ViewletRegistry.create<DiffViewState>()

export const { get } = registry
export const { getCommandIds } = registry
export const { getKeys } = registry
export const { registerCommands } = registry
export const { set } = registry
export const { wrapCommand } = registry
export const { wrapGetter } = registry
