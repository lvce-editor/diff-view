import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getBadgeVirtualDom } from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom', () => {
  const result = getBadgeVirtualDom(5)
  expect(result).toEqual([
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '5',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getBadgeVirtualDom with zero count', () => {
  const result = getBadgeVirtualDom(0)
  expect(result).toEqual([
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '0',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getBadgeVirtualDom with empty className', () => {
  const result = getBadgeVirtualDom(5)
  expect(result).toEqual([
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '5',
      type: VirtualDomElements.Text,
    },
  ])
})
