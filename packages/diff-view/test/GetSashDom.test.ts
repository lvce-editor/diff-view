import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSashDom } from '../src/parts/GetSashDom/GetSashDom.ts'

test('getSashDom renders a pointer-driven divider', (): void => {
  expect(getSashDom(ClassNames.SashVertical)).toEqual({
    childCount: 0,
    className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
    name: 'sash',
    onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
    type: VirtualDomElements.Div,
  })
})
