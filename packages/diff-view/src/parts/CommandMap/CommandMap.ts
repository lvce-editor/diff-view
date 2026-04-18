import * as Create2 from '../Create2/Create2.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { wrapCommand } from '../DiffViewStates/DiffViewStates.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { render2 } from '../Render2/Render2.ts'
import { saveState } from '../SaveState/SaveState.ts'

export const commandMap = {
  'DiffView.create': Create2.create2,
  'DiffView.diff2': diff2,
  'DiffView.initialize': Initialize.initialize,
  'DiffView.loadContent': wrapCommand(loadContent),
  'DiffView.render2': render2,
  'DiffView.saveState': saveState,
  'Initialize.initialize': Initialize.initialize,
}
