import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getErrorMessageDom } from '../src/parts/GetErrorMessageDom/GetErrorMessageDom.ts'

test('getErrorMessageDom renders the error message', (): void => {
  const result = getErrorMessageDom('permission denied')

  expect(result).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text('permission denied'),
  ])
})
