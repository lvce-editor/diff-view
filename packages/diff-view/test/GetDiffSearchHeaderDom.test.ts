import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getDiffSearchHeaderDom } from '../src/parts/GetDiffSearchHeaderDom/GetDiffSearchHeaderDom.ts'

test('getDiffSearchHeaderDom renders search header with match count', (): void => {
  const result = getDiffSearchHeaderDom('alpha beta gamma', 'alpha beta gamma', 'beta')
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.DiffSearchHeader,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 2,
    className: 'DiffSearchWidget',
    type: VirtualDomElements.Div,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: ClassNames.DiffSearchInput,
    inputType: 'search',
    placeholder: expect.any(String),
    type: VirtualDomElements.Input,
    value: 'beta',
  })
  expect(result[3]).toEqual({
    childCount: 0,
    className: 'DiffSearchMatchCount',
    text: '2 of 2',
    type: VirtualDomElements.Div,
  })
})

test('getDiffSearchHeaderDom shows no results class when query has no matches', (): void => {
  const result = getDiffSearchHeaderDom('alpha beta gamma', 'alpha beta gamma', 'xyz')
  expect(result[1]?.className).toBe('DiffSearchWidget DiffSearchWidgetNoResults')
  expect(result[3]?.text).toBe('0 of 0')
})

test('getDiffSearchHeaderDom handles empty query', (): void => {
  const result = getDiffSearchHeaderDom('alpha beta gamma', 'alpha beta gamma', '')
  expect(result[1]?.className).toBe('DiffSearchWidget')
  expect(result[2]?.value).toBe('')
})

test('getDiffSearchHeaderDom handles empty content', (): void => {
  const result = getDiffSearchHeaderDom('', '', 'test')
  expect(result[3]?.text).toBe('0 of 0')
})
