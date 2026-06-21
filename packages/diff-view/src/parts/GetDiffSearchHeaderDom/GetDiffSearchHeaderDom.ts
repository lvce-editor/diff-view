import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiffStrings from '../DiffStrings/DiffStrings.ts'

export const getDiffSearchHeaderDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffSearchHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffSearchInput,
      inputType: 'search',
      placeholder: DiffStrings.search(),
      type: VirtualDomElements.Input,
      value: '',
    },
  ]
}
