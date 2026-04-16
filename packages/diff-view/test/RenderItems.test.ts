import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems - returns correct command structure', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputPlaceholder: 'test placeholder',
    splitButtonEnabled: true,
    visibleItems: [],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 1, expect.any(Object)])
})

test('renderItems - handles different state values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputPlaceholder: 'different placeholder',
    splitButtonEnabled: false,
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail',
        file: 'test.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item',
        posInSet: 1,
        setSize: 1,
        type: 1,
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 2, expect.any(Object)])
})

test('renderItems - handles empty placeholder', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputPlaceholder: '',
    splitButtonEnabled: true,
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail 1',
        file: 'test1.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item 1',
        posInSet: 1,
        setSize: 2,
        type: 1,
      },
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail 2',
        file: 'test2.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item 2',
        posInSet: 2,
        setSize: 2,
        type: 1,
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 3, expect.any(Object)])
})
