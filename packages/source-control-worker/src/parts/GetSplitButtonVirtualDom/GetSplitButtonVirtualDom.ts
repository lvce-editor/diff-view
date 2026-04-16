import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSplitButtonVirtualDom = (hasItems: boolean, splitButtonEnabled: boolean, buttonText: string): readonly VirtualDomNode[] => {
  if (!splitButtonEnabled || !hasItems) {
    return []
  }
  return [
    {
      childCount: 3,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButton, hasItems ? '' : ClassNames.SplitButtonDisabled),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButtonContent, hasItems ? '' : ClassNames.SplitButtonContentDisabled),
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    text(buttonText),
    {
      childCount: 0,
      className: ClassNames.SplitButtonSeparator,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButtonDropDown, hasItems ? '' : ClassNames.SplitButtonDropDownDisabled),
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconChevronDown),
      type: VirtualDomElements.Div,
    },
  ]
}
