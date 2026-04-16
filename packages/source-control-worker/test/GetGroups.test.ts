import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { getGroups } from '../src/parts/GetGroups/GetGroups.ts'

test('getGroups - aggregates groups from multiple providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<Array<{ id: string }>> => [{ id: 'group1' }, { id: 'group2' }],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'], '/test-root', '/test-asset-dir', 1)
  expect(result).toEqual({
    allGroups: [{ id: 'group1' }, { id: 'group2' }, { id: 'group1' }, { id: 'group2' }],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - empty providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups([], '/test-root', '/test-asset-dir', 1)
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([])
})

test('getGroups - single provider', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1'], '/test-root', '/test-asset-dir', 1)
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - multiple providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'], '/test-root', '/test-asset-dir', 1)
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})
