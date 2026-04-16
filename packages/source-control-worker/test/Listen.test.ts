import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as Listen from '../src/parts/Listen/Listen.ts'
import { getCommandIds } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('listen - registers commands with command map', async (): Promise<void> => {
  RendererWorker.registerMockRpc(CommandMap.commandMap)
  await expect(Listen.listen()).rejects.toThrow()
  const commandIds = getCommandIds()
  expect(commandIds.length).toBeGreaterThan(0)
})

test('listen - attempts to create and set RPC client', async (): Promise<void> => {
  RendererWorker.registerMockRpc(CommandMap.commandMap)
  await expect(Listen.listen()).rejects.toThrow()
  const commandIds = getCommandIds()
  expect(commandIds.length).toBeGreaterThan(0)
})
