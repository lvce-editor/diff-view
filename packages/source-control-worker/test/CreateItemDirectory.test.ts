import { test, expect } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import { createItemDirectory } from '../src/parts/CreateItemDirectory/CreateItemDirectory.ts'
import * as TreeItemPadding from '../src/parts/TreeItemPadding/TreeItemPadding.ts'

test('createItemDirectory - basic directory', () => {
  const item: VisibleItem = {
    badgeCount: 0,
    buttons: [],
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    fileIcon: 'Directory',
    groupId: 'test',
    icon: 'Directory',
    indent: 0,
    label: 'test',
    posInSet: 1,
    setSize: 2,
    type: DirentType.Directory,
  }
  const result = createItemDirectory(item)
  expect(result).toEqual([
    {
      ariaExpanded: false,
      ariaPosInSet: 1,
      ariaSetSize: 2,
      childCount: 3,
      className: 'TreeItem Indent-0',
      paddingRight: TreeItemPadding.PaddingRight,
      role: 'treeitem',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconDirectory',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
    {
      childCount: 0,
      className: 'SourceControlButtons',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: 4,
    },
    {
      childCount: 0,
      text: '0',
      type: 12,
    },
  ])
})

test('createItemDirectory - expanded directory with badge and buttons', () => {
  const item: VisibleItem = {
    badgeCount: 1,
    buttons: [
      {
        command: 'delete',
        icon: 'delete',
        label: 'Delete',
      },
    ],
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    fileIcon: 'Directory',
    groupId: 'test',
    icon: 'Directory',
    indent: 0,
    label: 'test',
    posInSet: 1,
    setSize: 2,
    type: DirentType.DirectoryExpanded,
  }
  const result = createItemDirectory(item)
  expect(result).toEqual([
    {
      ariaExpanded: true,
      ariaPosInSet: 1,
      ariaSetSize: 2,
      childCount: 4,
      className: 'TreeItem Indent-0',
      paddingRight: '12px',
      role: 'treeitem',
      type: 4,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconDirectory',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
    {
      childCount: 1,
      className: 'SourceControlButtons',
      type: 4,
    },
    {
      ariaLabel: 'Delete',
      childCount: 1,
      className: 'SourceControlButton',
      name: 'Delete',
      title: 'Delete',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIcondelete',
      role: 'none',
      type: 8,
    },
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: 4,
    },
    {
      childCount: 0,
      text: '1',
      type: 12,
    },
  ])
})
