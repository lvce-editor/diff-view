import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getDiffModeToggleDom } from '../GetDiffModeToggleDom/GetDiffModeToggleDom.ts'
import { getWhitespaceToggleDom } from '../GetWhitespaceToggleDom/GetWhitespaceToggleDom.ts'

export const getDiffEditorButtonsDom = (diffMode: DiffMode, showWhitespace: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ClassNames.DiffEditorButtons,
      type: VirtualDomElements.Div,
    },
    ...getWhitespaceToggleDom(showWhitespace),
    ...getDiffModeToggleDom(diffMode),
  ]
}
