import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getActions = (): readonly Action[] => {
  return [
    {
      command: '',
      icon: MaskIcon.ListFlat,
      id: ViewletSourceControlStrings.viewAsTree(),
      name: InputName.ViewAsTree,
      type: ActionType.Button,
    },
    {
      command: '',
      icon: MaskIcon.Check,
      id: ViewletSourceControlStrings.commitAndPush(),
      name: InputName.CommitAndPush,
      type: ActionType.Button,
    },
    {
      command: '',
      icon: MaskIcon.Refresh,
      id: ViewletSourceControlStrings.refresh(),
      name: InputName.Refresh,
      type: ActionType.Button,
    },
  ]
}
