import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<SourceControlState>()
