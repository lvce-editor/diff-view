import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as Main from '../src/parts/Main/Main.ts'
import { getCommandIds } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('main calls listen', async () => {
  RendererWorker.registerMockRpc(CommandMap.commandMap)
  await expect(Main.main()).rejects.toThrow()
  const commandIds = getCommandIds()
  expect(commandIds.length).toBeGreaterThan(0)
})

test('handles listen error', async () => {
  RendererWorker.registerMockRpc(CommandMap.commandMap)
  await expect(Main.main()).rejects.toThrow()
})
