import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const { get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<DiffViewState>()
