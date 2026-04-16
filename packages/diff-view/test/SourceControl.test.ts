import { beforeAll, expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as SourceControl from '../src/parts/SourceControl/SourceControl.ts'

beforeAll(() => {
  const commandMap = {}
  ParentRpc.registerMockRpc(commandMap)
})

test('state should be initialized with default values', (): void => {
  expect(SourceControl.state).toEqual({
    enabledProviders: [],
    initialized: false,
  })
})

test('acceptInput should call ExtensionHostSourceControl.acceptInput', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.acceptInput': async (): Promise<void> => {},
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)
  await SourceControl.acceptInput('test-provider', 'test-input', '/test-asset-dir', 1)
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.acceptInput', 'test-provider', 'test-input']])
})

test('getChangedFiles should call ExtensionHostSourceControl.getChangedFiles', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHost.sourceControlGetChangedFiles': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getChangedFiles('test-provider', '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHost.sourceControlGetChangedFiles', 'test-provider']])
})

test('getFileBefore should call ExtensionHostSourceControl.getFileBefore', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileBefore': async (): Promise<Record<string, never>> => ({}),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getFileBefore('test-provider', 'test-file', '/test-asset-dir', 1)
  expect(result).toEqual({})
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'test-provider', 'test-file']])
})

test.skip('add should call ExtensionHostSourceControl.add', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.add': async (): Promise<void> => {},
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  await SourceControl.add('test-file')
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.add', 'test-file']])
})

test.skip('discard should call ExtensionHostSourceControl.discard', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.discard': async (): Promise<void> => {},
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  await SourceControl.discard('test-file')
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.discard', 'test-file']])
})

test('getEnabledProviderIds should call ExtensionHostSourceControl.getEnabledProviderIds', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<string[]> => ['test-provider'],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getEnabledProviderIds('test-scheme', 'test-root', '/test-asset-dir', 1)
  expect(result).toEqual(['test-provider'])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getEnabledProviderIds', 'test-scheme', 'test-root']])
})

test('getGroups should call ExtensionHostSourceControl.getGroups', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getGroups('test-provider', 'test-root', '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getGroups', 'test-provider', 'test-root']])
})

test('getFileDecorations should call ExtensionHostSourceControl.getFileDecorations', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileDecorations': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getFileDecorations('test-provider', ['test-uri'], '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileDecorations', 'test-provider', ['test-uri']]])
})

test('getIconDefinitions should return empty array when providerIds is empty', async (): Promise<void> => {
  const result = await SourceControl.getIconDefinitions([])
  expect(result).toEqual([])
})

test('getIconDefinitions should call ExtensionHostSourceControl.getIconDefinitions with first providerId', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<string[]> => ['icon1', 'icon2'],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await SourceControl.getIconDefinitions(['provider1', 'provider2'])
  expect(result).toEqual(['icon1', 'icon2'])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getIconDefinitions', 'provider1']])
})

test('getIconDefinitions should return empty array on error', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<string[]> => {
      throw new Error('test error')
    },
  }
  ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await SourceControl.getIconDefinitions(['provider1'])
  expect(result).toEqual([])
})
