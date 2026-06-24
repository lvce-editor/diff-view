import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DiffStrings from '../DiffStrings/DiffStrings.ts'

const countOccurrences = (text: string, query: string): number => {
  if (!query) return 0
  let count = 0
  let index = 0
  while (true) {
    index = text.indexOf(query, index)
    if (index === -1) break
    count += 1
    index += query.length
  }
  return count
}

export const getDiffSearchHeaderDom = (contentLeft: string, contentRight: string, query: string): readonly VirtualDomNode[] => {
  const q = query || ''
  const leftCount = countOccurrences(contentLeft || '', query)
  const rightCount = countOccurrences(contentRight || '', q)
  const total = leftCount + rightCount
  const widgetClass = total === 0 && query ? 'DiffSearchWidget DiffSearchWidgetNoResults' : 'DiffSearchWidget'

  return [
    {
      childCount: 1,
      className: ClassNames.DiffSearchHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: widgetClass,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffSearchInput,
      inputType: 'search',
      placeholder: DiffStrings.search(),
      type: VirtualDomElements.Input,
      value: q,
    },
    {
      childCount: 0,
      className: 'DiffSearchMatchCount',
      text: `${total} of ${total}`,
      type: VirtualDomElements.Div,
    },
  ]
}
