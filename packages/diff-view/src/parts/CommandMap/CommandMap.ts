import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create2 from '../Create2/Create2.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { wrapCommand } from '../DiffViewStates/DiffViewStates.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleSashPointerDown } from '../HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerMove } from '../HandleSashPointerMove/HandleSashPointerMove.ts'
import { handleSashPointerUp } from '../HandleSashPointerUp/HandleSashPointerUp.ts'
import { handleScrollBarPointerDown } from '../HandleScrollBarPointerDown/HandleScrollBarPointerDown.ts'
import { handleScrollBarPointerMove } from '../HandleScrollBarPointerMove/HandleScrollBarPointerMove.ts'
import { handleScrollBarPointerUp } from '../HandleScrollBarPointerUp/HandleScrollBarPointerUp.ts'
import { handleWheel } from '../HandleWheel/HandleWheel.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { render2 } from '../Render2/Render2.ts'
import { saveState } from '../SaveState/SaveState.ts'
import { setLayout } from '../SetLayout/SetLayout.ts'

export const commandMap = {
  'DiffView.create': Create2.create2,
  'DiffView.diff2': diff2,
  'DiffView.handleContextMenu': wrapCommand(handleContextMenu),
  'DiffView.handleSashPointerDown': wrapCommand(handleSashPointerDown),
  'DiffView.handleSashPointerMove': wrapCommand(handleSashPointerMove),
  'DiffView.handleSashPointerUp': wrapCommand(handleSashPointerUp),
  'DiffView.handleScrollBarPointerDown': wrapCommand(handleScrollBarPointerDown),
  'DiffView.handleScrollBarPointerMove': wrapCommand(handleScrollBarPointerMove),
  'DiffView.handleScrollBarPointerUp': wrapCommand(handleScrollBarPointerUp),
  'DiffView.handleWheel': wrapCommand(handleWheel),
  'DiffView.initialize': Initialize.initialize,
  'DiffView.loadContent': wrapCommand(loadContent),
  'DiffView.render2': render2,
  'DiffView.saveState': saveState,
  'DiffView.setLayout': wrapCommand(setLayout),
  'DiffView.terminate': terminate,
  'Initialize.initialize': Initialize.initialize,
}
