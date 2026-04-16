import { terminate } from '@lvce-editor/viewlet-registry'
import { acceptInput } from '../AcceptInput/AcceptInput.ts'
import * as Create2 from '../Create2/Create2.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import { getBadgeCount } from '../GetBadgeCount/GetBadgeCount.ts'
import * as GetInfo from '../GetInfo/GetInfo.ts'
import { getKeyBindings } from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuEntries2 } from '../GetMenuEntries2/GetMenuEntries2.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import * as HandleActionClick from '../HandleActionClick/HandleActionClick.ts'
import * as HandleButtonClick from '../HandleButtonClick/HandleButtonClick.ts'
import * as HandleClickAt from '../HandleClickAt/HandleClickAt.ts'
import * as HandleClickSourceControlButtons from '../HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as HandleFocus from '../HandleFocus/HandleFocus.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'
import { handleInputBlur } from '../HandleInputBlur/HandleInputBlur.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as HandleMouseOut from '../HandleMouseOut/HandleMouseOut.ts'
import * as HandleMouseOutAt from '../HandleMouseOutAt/HandleMouseOutAt.ts'
import * as HandleMouseOver from '../HandleMouseOver/HandleMouseOver.ts'
import * as HandleMouseOverAt from '../HandleMouseOverAt/HandleMouseOverAt.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import { handleWorkspaceRefresh } from '../HandleWorkspaceRefresh/HandleWorkspaceRefresh.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderActions2 from '../RenderActions2/RenderActions2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'
import * as SetDeltaY from '../SetDeltaY/SetDeltaY.ts'
import { getEnabledProviderIds, getFileDecorations } from '../SourceControl/SourceControl.ts'
import * as WrapCommand from '../SourceControlStates/SourceControlStates.ts'
import * as UpdateIcons from '../UpdateIcons/UpdateIcons.ts'
import * as ViewAsList from '../ViewAsList/ViewAsList.ts'
import * as ViewAsTree from '../ViewAsTree/ViewAsTree.ts'

export const commandMap = {
  'Initialize.initialize': Initialize.initialize,
  'SourceControl.acceptInput': WrapCommand.wrapCommand(acceptInput),
  'SourceControl.create2': Create2.create2,
  'SourceControl.diff2': Diff2.diff2,
  'SourceControl.getBadgeCount': WrapCommand.wrapGetter(getBadgeCount),
  'SourceControl.getCommandIds': WrapCommand.getCommandIds,
  'SourceControl.getEnabledProviderIds': getEnabledProviderIds,
  'SourceControl.getFileDecorations': getFileDecorations,
  'SourceControl.getInfo': GetInfo.getInfo,
  'SourceControl.getKeyBindings': getKeyBindings,
  'SourceControl.getMenuEntries2': WrapCommand.wrapGetter(getMenuEntries2),
  'SourceControl.getMenuIds': getMenuIds,
  'SourceControl.handleActionClick': WrapCommand.wrapCommand(HandleActionClick.handleActionClick),
  'SourceControl.handleButtonClick': WrapCommand.wrapCommand(HandleButtonClick.handleButtonClick),
  'SourceControl.handleClickAt': WrapCommand.wrapCommand(HandleClickAt.handleClickAt),
  'SourceControl.handleClickSourceControlButtons': WrapCommand.wrapCommand(HandleClickSourceControlButtons.handleClickSourceControlButtons),
  'SourceControl.handleContextMenu': WrapCommand.wrapCommand(HandleContextMenu.handleContextMenu),
  'SourceControl.handleFocus': WrapCommand.wrapCommand(HandleFocus.handleInputFocus),
  'SourceControl.handleInput': WrapCommand.wrapCommand(handleInput),
  'SourceControl.handleInputBlur': WrapCommand.wrapCommand(handleInputBlur),
  'SourceControl.handleMessagePort': HandleMessagePort.handleMessagePort,
  'SourceControl.handleMouseOut': WrapCommand.wrapCommand(HandleMouseOut.handleMouseOut),
  'SourceControl.handleMouseOutAt': WrapCommand.wrapCommand(HandleMouseOutAt.handleMouseOutAt),
  'SourceControl.handleMouseOver': WrapCommand.wrapCommand(HandleMouseOver.handleMouseOver),
  'SourceControl.handleMouseOverAt': WrapCommand.wrapCommand(HandleMouseOverAt.handleMouseOverAt),
  'SourceControl.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'SourceControl.handleWorkspaceRefresh': WrapCommand.wrapCommand(handleWorkspaceRefresh),
  'SourceControl.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'SourceControl.refresh': WrapCommand.wrapCommand(Refresh.refresh),
  'SourceControl.render2': Render2.render2,
  'SourceControl.renderActions': WrapCommand.wrapGetter(RenderActions2.renderActions),
  'SourceControl.renderActions2': RenderActions2.renderActions,
  'SourceControl.renderEventListeners': RenderEventListeners.renderEventListeners,
  'SourceControl.saveState': SaveState.saveState,
  'SourceControl.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'SourceControl.setDeltaY': WrapCommand.wrapCommand(SetDeltaY.setDeltaY),
  'SourceControl.terminate': terminate,
  'SourceControl.updateIcons': WrapCommand.wrapCommand(UpdateIcons.updateIcons),
  'SourceControl.viewAsList': WrapCommand.wrapCommand(ViewAsList.viewAsList),
  'SourceControl.viewAsTree': WrapCommand.wrapCommand(ViewAsTree.viewAsTree),
}
