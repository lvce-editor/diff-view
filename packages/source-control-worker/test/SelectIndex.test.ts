import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { ExtensionHost, RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex - invalid index', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const newState = await selectIndex(state, -1)
  expect(newState).toBe(state)
})

test('selectIndex - directory', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readDirWithFileTypes': async (): Promise<never[]> => [],
    'IconTheme.getIcons': async (): Promise<never[]> => [],
  }
  ParentRpc.registerMockRpc(commandMap)

  const testItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    groupId: 'test',
    icon: '',
    label: 'test',
    posInSet: 1,
    setSize: 1,
    type: DirentType.Directory,
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    allGroups: [
      {
        id: 'test',
        items: [testItem],
        label: 'test',
      },
    ],
    enabledProviderIds: ['test'],
    items: [testItem],
  }
  const newState = await selectIndex(state, 0)
  expect(newState.expandedGroups['test']).toBe(true)
})

test('selectIndex - expanded directory', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readDirWithFileTypes': async (): Promise<never[]> => [],
    'IconTheme.getIcons': async (): Promise<never[]> => [],
  }
  ParentRpc.registerMockRpc(commandMap)

  const testItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    groupId: 'test',
    icon: '',
    label: 'test',
    posInSet: 1,
    setSize: 1,
    type: DirentType.DirectoryExpanded,
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    allGroups: [
      {
        id: 'test',
        items: [testItem],
        label: 'test',
      },
    ],
    enabledProviderIds: ['test'],
    expandedGroups: { test: true },
    items: [testItem],
  }
  const newState = await selectIndex(state, 0)
  expect(newState.expandedGroups['test']).toBe(false)
})

test('selectIndex - file', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'FileSystem.readFile': async (): Promise<string> => '',
    'IconTheme.getIcons': async (): Promise<never[]> => [],
    'Main.openUri': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileBefore': async (): Promise<string> => '',
  }
  ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const testItem = {
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
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    allGroups: [
      {
        id: 'test',
        items: [testItem],
        label: 'test',
      },
    ],
    enabledProviderIds: ['test'],
    items: [testItem],
    root: '/test',
  }
  const newState = await selectIndex(state, 0)
  expect(newState.items[0].type).toBe(DirentType.File)
})

test('selectIndex - unknown item type', async (): Promise<void> => {
  const testItem = {
    badgeCount: 0,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: 'test',
    groupId: 'test',
    icon: '',
    label: 'test',
    posInSet: 1,
    setSize: 1,
    type: 999,
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    allGroups: [
      {
        id: 'test',
        items: [testItem],
        label: 'test',
      },
    ],
    enabledProviderIds: ['test'],
    items: [testItem],
  }
  const newState = await selectIndex(state, 0)
  expect(newState).toBe(state)
})
