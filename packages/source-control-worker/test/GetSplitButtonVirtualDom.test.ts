import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getSplitButtonVirtualDom } from '../src/parts/GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('getSourceControlItemsVirtualDom - with items', () => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(true, splitButtonEnabled, 'test')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.SplitButton,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.SplitButtonContent,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    text: 'test',
    type: VirtualDomElements.Text,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    className: ClassNames.SplitButtonSeparator,
    type: VirtualDomElements.Div,
  })
  expect(result[4]).toEqual({
    childCount: 1,
    className: ClassNames.SplitButtonDropDown,
    tabIndex: 0,
    type: VirtualDomElements.Div,
  })
  expect(result[5]).toEqual({
    childCount: 0,
    className: `${ClassNames.MaskIcon} ${ClassNames.MaskIconChevronDown}`,
    type: VirtualDomElements.Div,
  })
})

test('getSourceControlItemsVirtualDom - without items', (): void => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(false, splitButtonEnabled, 'test')
  expect(result).toHaveLength(0)
})

test('getSourceControlItemsVirtualDom - splitButton disabled', (): void => {
  const splitButtonEnabled = false
  const result = getSplitButtonVirtualDom(true, splitButtonEnabled, 'test')
  expect(result).toHaveLength(0)
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButton (line 14)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[0].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButton, hasItems ? '' : ClassNames.SplitButtonDisabled))
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButtonContent (line 19)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[1].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButtonContent, hasItems ? '' : ClassNames.SplitButtonContentDisabled))
})

test('getSplitButtonVirtualDom - verifies SplitButtonSeparator structure (lines 25-27)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[3]).toEqual({
    childCount: 0,
    className: ClassNames.SplitButtonSeparator,
    type: VirtualDomElements.Div,
  })
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButtonDropDown (line 31)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[4].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButtonDropDown, hasItems ? '' : ClassNames.SplitButtonDropDownDisabled))
})
