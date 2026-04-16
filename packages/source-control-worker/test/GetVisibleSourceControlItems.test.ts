import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { getVisibleSourceControlItems } from '../src/parts/GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

test('getVisibleSourceControlItems - empty items', () => {
  const items: any[] = []
  const minLineY = 0
  const maxLineY = 0
  const actionsCache = {}
  const fileIconCache = {}
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([])
})

test('getVisibleSourceControlItems - single item', () => {
  const items = [
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: '',
      file: 'test.txt',
      groupId: 'test',
      icon: '',
      label: 'test.txt',
      posInSet: 1,
      setSize: 1,
      type: DirentType.File,
    },
  ]
  const minLineY = 0
  const maxLineY = 1
  const actionsCache = {
    'test-item': [
      {
        command: 'test.command',
        icon: 'test',
        id: 'test',
        label: 'Test',
      },
    ],
  }
  const fileIconCache = {
    'test.txt': 'file-icon',
  }
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([
    {
      ...items[0],
      buttons: actionsCache['test-item'],
      fileIcon: 'file-icon',
      indent: 16,
    },
  ])
})

test('getVisibleSourceControlItems - multiple items', () => {
  const items = [
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: '',
      file: 'test1.txt',
      groupId: 'test1',
      icon: '',
      label: 'test1.txt',
      posInSet: 1,
      setSize: 2,
      type: DirentType.File,
    },
    {
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: '',
      file: 'test2.txt',
      groupId: 'test2',
      icon: '',
      label: 'test2.txt',
      posInSet: 2,
      setSize: 2,
      type: DirentType.File,
    },
  ]
  const minLineY = 0
  const maxLineY = 2
  const actionsCache = {
    'test1-item': [
      {
        command: 'test1.command',
        icon: 'test1',
        id: 'test1',
        label: 'Test1',
      },
    ],
    'test2-item': [
      {
        command: 'test2.command',
        icon: 'test2',
        id: 'test2',
        label: 'Test2',
      },
    ],
  }
  const fileIconCache = {
    'test1.txt': 'file-icon1',
    'test2.txt': 'file-icon2',
  }
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([
    {
      ...items[0],
      buttons: actionsCache['test1-item'],
      fileIcon: 'file-icon1',
      indent: 16,
    },
    {
      ...items[1],
      buttons: actionsCache['test2-item'],
      fileIcon: 'file-icon2',
      indent: 16,
    },
  ])
})
