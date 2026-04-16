import { expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSourceControlButtons } from '../src/parts/HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'

const extensionHostCommandMap = {
  'ExtensionHostCommand.executeCommand': async (): Promise<void> => {},
  'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
    allGroups: [],
    gitRoot: '/test',
  }),
}

test('handleClickSourceControlButtons - valid button click', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  ParentRpc.registerMockRpc(parentCommandMap)
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const state: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [
          {
            command: 'git.stage',
            icon: '',
            label: 'Stage',
          },
        ],
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
        type: 0,
      },
    ],
  }

  const newState = await handleClickSourceControlButtons(state, 0, 'Stage')
  expect(newState).toBeDefined()
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('handleClickSourceControlButtons - invalid index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [],
  }
  const newState = await handleClickSourceControlButtons(state, 0, 'Stage')
  expect(newState).toBe(state)
})

test('handleClickSourceControlButtons - invalid button name', async (): Promise<void> => {
  const consoleWarnSpy = jest.spyOn((globalThis as any).console, 'warn').mockImplementation(() => {})
  const state: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [
          {
            command: 'git.stage',
            icon: '',
            label: 'Stage',
          },
        ],
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
        type: 0,
      },
    ],
  }

  const newState = await handleClickSourceControlButtons(state, 0, 'InvalidButton')
  expect(newState).toBe(state)
  expect(consoleWarnSpy).toHaveBeenCalledWith('[source-control-worker] Button not found InvalidButton')
  consoleWarnSpy.mockRestore()
})
