import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollBarDom } from '../src/parts/GetScrollBarDom/GetScrollBarDom.ts'

test('getScrollBarDom renders the scrollbar track and thumb', (): void => {
  expect(getScrollBarDom()).toEqual([
    {
      childCount: 1,
      className: ClassNames.DiffScrollBar,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffScrollBarThumb,
      name: 'scrollBarThumb',
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
  ])
})
