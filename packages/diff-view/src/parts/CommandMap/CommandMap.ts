import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create2 from '../Create2/Create2.ts'
import { deleteLeft } from '../DeleteLeft/DeleteLeft.ts'
import { deleteRight } from '../DeleteRight/DeleteRight.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { getCommandIds, wrapCommand } from '../DiffViewStates/DiffViewStates.ts'
import { getKeyBindings } from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuEntries2 } from '../GetMenuEntries2/GetMenuEntries2.ts'
import { getMenuEntries } from '../GetMenuEntries/GetMenuEntries.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import { handleClickAction } from '../HandleClickAction/HandleClickAction.ts'
import { handleClickAt } from '../HandleClickAt/HandleClickAt.ts'
import { handleClickLeftSide } from '../HandleClickLeftSide/HandleClickLeftSide.ts'
import { handleClickRightSide } from '../HandleClickRightSide/HandleClickRightSide.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleCopy } from '../HandleCopy/HandleCopy.ts'
import { handleCut } from '../HandleCut/HandleCut.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'
import { handlePaste } from '../HandlePaste/HandlePaste.ts'
import { handleResize } from '../HandleResize/HandleResize.ts'
import { handleSashPointerDown } from '../HandleSashPointerDown/HandleSashPointerDown.ts'
import { handleSashPointerMove } from '../HandleSashPointerMove/HandleSashPointerMove.ts'
import { handleSashPointerUp } from '../HandleSashPointerUp/HandleSashPointerUp.ts'
import { handleScrollBarPointerDown } from '../HandleScrollBarPointerDown/HandleScrollBarPointerDown.ts'
import { handleScrollBarPointerMove } from '../HandleScrollBarPointerMove/HandleScrollBarPointerMove.ts'
import { handleScrollBarPointerUp } from '../HandleScrollBarPointerUp/HandleScrollBarPointerUp.ts'
import { handleWheel } from '../HandleWheel/HandleWheel.ts'
import { hideSearch } from '../HideSearch/HideSearch.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { insertLineBreak } from '../InsertLineBreak/InsertLineBreak.ts'
import { jumpToNextChange } from '../JumpToNextChange/JumpToNextChange.ts'
import { jumpToPreviousChange } from '../JumpToPreviousChange/JumpToPreviousChange.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { render2 } from '../Render2/Render2.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import { saveState } from '../SaveState/SaveState.ts'
import { setDiffMode } from '../SetDiffMode/SetDiffMode.ts'
import { setLayout } from '../SetLayout/SetLayout.ts'
import { showSearch } from '../ShowSearch/ShowSearch.ts'
import { toggleDiffMode } from '../ToggleDiffMode/ToggleDiffMode.ts'
import { toggleWhitespace } from '../ToggleWhitespace/ToggleWhitespace.ts'

export const commandMap = {
  'Diff.getCommandIds': getCommandIds,
  'DiffView.create': Create2.create2,
  'DiffView.deleteLeft': wrapCommand(deleteLeft),
  'DiffView.deleteRight': wrapCommand(deleteRight),
  'DiffView.diff2': diff2,
  'DiffView.getCommandIds': getCommandIds,
  'DiffView.getKeyBindings': getKeyBindings,
  'DiffView.getMenuEntries': getMenuEntries,
  'DiffView.getMenuEntries2': getMenuEntries2,
  'DiffView.getMenuIds': getMenuIds,
  'DiffView.handleClickAction': wrapCommand(handleClickAction),
  'DiffView.handleClickAt': wrapCommand(handleClickAt),
  'DiffView.handleClickLeftSide': wrapCommand(handleClickLeftSide),
  'DiffView.handleClickRightSide': wrapCommand(handleClickRightSide),
  'DiffView.handleContextMenu': wrapCommand(handleContextMenu),
  'DiffView.handleCopy': wrapCommand(handleCopy),
  'DiffView.handleCut': wrapCommand(handleCut),
  'DiffView.handleInput': wrapCommand(handleInput),
  'DiffView.handlePaste': wrapCommand(handlePaste),
  'DiffView.handleResize': wrapCommand(handleResize),
  'DiffView.handleSashPointerDown': wrapCommand(handleSashPointerDown),
  'DiffView.handleSashPointerMove': wrapCommand(handleSashPointerMove),
  'DiffView.handleSashPointerUp': wrapCommand(handleSashPointerUp),
  'DiffView.handleScrollBarPointerDown': wrapCommand(handleScrollBarPointerDown),
  'DiffView.handleScrollBarPointerMove': wrapCommand(handleScrollBarPointerMove),
  'DiffView.handleScrollBarPointerUp': wrapCommand(handleScrollBarPointerUp),
  'DiffView.handleWheel': wrapCommand(handleWheel),
  'DiffView.hideSearch': wrapCommand(hideSearch),
  'DiffView.initialize': Initialize.initialize,
  'DiffView.insertLineBreak': wrapCommand(insertLineBreak),
  'DiffView.jumpToNextChange': wrapCommand(jumpToNextChange),
  'DiffView.jumpToPreviousChange': wrapCommand(jumpToPreviousChange),
  'DiffView.loadContent': wrapCommand(loadContent),
  'DiffView.render2': render2,
  'DiffView.renderEventListeners': renderEventListeners,
  'DiffView.saveState': saveState,
  'DiffView.setDiffMode': wrapCommand(setDiffMode),
  'DiffView.setLayout': wrapCommand(setLayout),
  'DiffView.showSearch': wrapCommand(showSearch),
  'DiffView.terminate': terminate,
  'DiffView.toggleDiffMode': wrapCommand(toggleDiffMode),
  'DiffView.toggleWhitespace': wrapCommand(toggleWhitespace),
  'Initialize.initialize': Initialize.initialize,
}
