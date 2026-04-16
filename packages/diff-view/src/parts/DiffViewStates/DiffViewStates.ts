import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const { get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<DiffViewState>()
