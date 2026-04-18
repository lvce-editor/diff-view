import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create2 from '../Create2/Create2.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { wrapCommand } from '../DiffViewStates/DiffViewStates.ts'
import { handleSashPointerDown } from '../HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerMove } from '../HandleSashPointerMove/HandleSashPointerMove.ts'
import { handleSashPointerUp } from '../HandleSashPointerUp/HandleSashPointerUp.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { render2 } from '../Render2/Render2.ts'
import { saveState } from '../SaveState/SaveState.ts'
import { setLayout } from '../SetLayout/SetLayout.ts'

export const commandMap = {
  'DiffView.create': Create2.create2,
  'DiffView.diff2': diff2,
  'DiffView.handleSashPointerDown': wrapCommand(handleSashPointerDown),
  'DiffView.handleSashPointerMove': wrapCommand(handleSashPointerMove),
  'DiffView.handleSashPointerUp': wrapCommand(handleSashPointerUp),
  'DiffView.initialize': Initialize.initialize,
  'DiffView.loadContent': wrapCommand(loadContent),
  'DiffView.render2': render2,
  'DiffView.saveState': saveState,
  'DiffView.setLayout': wrapCommand(setLayout),
  'DiffView.terminate': terminate,
  'Initialize.initialize': Initialize.initialize,
}
