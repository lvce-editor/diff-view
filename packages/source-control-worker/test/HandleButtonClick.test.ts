import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleButtonClick } from '../src/parts/HandleButtonClick/HandleButtonClick.ts'

test('handleButtonClick - valid button click', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostCommand.executeCommand': async (): Promise<void> => {},
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<never[]> => [],
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '',
    }),
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<never[]> => [],
    'Extensions.getExtensions': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<never[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  const rendererMockRpc = RendererWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
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

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBeDefined()
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
  expect(rendererMockRpc.invocations.length).toBeGreaterThan(0)
})

test('handleButtonClick - invalid index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [],
  }
  await expect(handleButtonClick(state, 0)).rejects.toThrow()
})

test('handleButtonClick - invalid button index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [
      {
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
        type: 0,
      },
    ],
  }

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBe(state)
})
