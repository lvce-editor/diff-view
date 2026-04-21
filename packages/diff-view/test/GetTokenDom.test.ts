import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getTokenDom } from '../src/parts/GetTokenDom/GetTokenDom.ts'

test('getTokenDom renders plain token text without a span', (): void => {
  const result = getTokenDom({ className: '', text: 'first-line' })

  expect(result).toEqual([
    {
      childCount: 0,
      text: 'first-line',
      type: 12,
    },
  ])
})

test('getTokenDom renders token text inside a span when className is present', (): void => {
  const result = getTokenDom({ className: 'Token Keyword', text: 'const' })

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'Token Keyword',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'const',
      type: 12,
    },
  ])
})
