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

export const getDiffSearchHeaderDom = (
  contentLeft: string,
  contentRight: string,
  queryLeft: string,
  queryRight: string,
): readonly VirtualDomNode[] => {
  const qLeft = queryLeft || ''
  const qRight = queryRight || ''
  const leftCount = countOccurrences(contentLeft || '', qLeft)
  const rightCount = countOccurrences(contentRight || '', qRight)
  const total = leftCount + rightCount
  const widgetClass = total === 0 ? 'DiffSearchWidget DiffSearchWidgetNoResults' : 'DiffSearchWidget'

  return [
    {
      childCount: 1,
      className: ClassNames.DiffSearchHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: widgetClass,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.DiffSearchInput} DiffSearchInputLeft`,
      inputType: 'search',
      placeholder: `${DiffStrings.search()} (left)`,
      type: VirtualDomElements.Input,
      value: qLeft,
    },
    {
      childCount: 0,
      className: 'DiffSearchMatchCount DiffSearchMatchCountLeft',
      text: `${leftCount} matches`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.DiffSearchInput} DiffSearchInputRight`,
      inputType: 'search',
      placeholder: `${DiffStrings.search()} (right)`,
      type: VirtualDomElements.Input,
      value: qRight,
    },
    {
      childCount: 0,
      className: 'DiffSearchMatchCount DiffSearchMatchCountRight',
      text: `${rightCount} matches`,
      type: VirtualDomElements.Div,
    },
  ]
}
