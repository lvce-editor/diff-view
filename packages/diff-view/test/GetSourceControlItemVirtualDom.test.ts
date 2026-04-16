import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import { getSourceControlItemVirtualDom } from '../src/parts/GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'

test('getSourceControlItemVirtualDom - directory', () => {
  const item: VisibleItem = {
    badgeCount: 0,
    buttons: [],
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    fileIcon: '',
    groupId: '',
    icon: '',
    indent: 0,
    label: 'test',
    posInSet: 1,
    setSize: 1,
    type: DirentType.Directory,
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})

test('getSourceControlItemVirtualDom - directory expanded', () => {
  const item: VisibleItem = {
    badgeCount: 0,
    buttons: [],
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    fileIcon: '',
    groupId: '',
    icon: '',
    indent: 0,
    label: 'test',
    posInSet: 1,
    setSize: 1,
    type: DirentType.DirectoryExpanded,
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})

test('getSourceControlItemVirtualDom - other', () => {
  const item: VisibleItem = {
    badgeCount: 0,
    buttons: [],
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test.js',
    fileIcon: '',
    groupId: '',
    icon: '',
    indent: 16,
    label: 'test.js',
    posInSet: 1,
    setSize: 1,
    type: DirentType.File,
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})
