import { test, expect } from '@jest/globals'
import { getDisplayItems } from '../src/parts/GetDisplayItems/GetDisplayItems.ts'

test('getDisplayItems - collapsed', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
  ]
  const expandedGroups = {}
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(1)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronRight',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 3,
  })
})

test('getDisplayItems - expanded', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
  ]
  const expandedGroups = { '1': true }
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(2)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronDown',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 4,
  })
  expect(actual[1]).toEqual({
    badgeCount: 0,
    decorationIcon: 'icon1',
    decorationIconTitle: 'title1',
    decorationStrikeThrough: false,
    detail: '/path/to',
    file: '/path/to/file1.ts',
    groupId: '1',
    icon: '',
    label: 'file1.ts',
    posInSet: 1,
    setSize: 1,
    type: 7,
  })
})

test('getDisplayItems - multiple groups with different expansion states', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
    {
      id: '2',
      items: [
        {
          file: '/path/to/file2.ts',
          icon: 'icon2',
          iconTitle: 'title2',
          strikeThrough: false,
        },
      ],
      label: 'Group 2',
    },
  ]
  const expandedGroups = { '1': true, '2': false }
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(3)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronDown',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 4,
  })
  expect(actual[1]).toEqual({
    badgeCount: 0,
    decorationIcon: 'icon1',
    decorationIconTitle: 'title1',
    decorationStrikeThrough: false,
    detail: '/path/to',
    file: '/path/to/file1.ts',
    groupId: '1',
    icon: '',
    label: 'file1.ts',
    posInSet: 1,
    setSize: 1,
    type: 7,
  })
  expect(actual[2]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '2',
    icon: 'ChevronRight',
    label: 'Group 2',
    posInSet: 1,
    setSize: 1,
    type: 3,
  })
})
