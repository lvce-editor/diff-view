import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetInputHeight from '../src/parts/GetInputHeight/GetInputHeight.ts'

test('getInputHeight - returns height from RPC call when successful', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 60,
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  const result = await GetInputHeight.getInputHeight('test input', 200, 'Arial', 400, 14, 0, 30, 0)

  expect(result).toBe(60)
  expect(mockRpc.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', 'test input', 'Arial', 14, '30px', 200]])
})

test('getInputHeight - passes through all parameters correctly', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 45,
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  const result = await GetInputHeight.getInputHeight('multiline\ninput', 300, 'Monaco', 600, 16, 1, 25, 0)

  expect(result).toBe(45)
  expect(mockRpc.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', 'multiline\ninput', 'Monaco', 16, '25px', 300]])
})

test('getInputHeight - handles different input values', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetInputHeight.getInputHeight('', 100, 'Courier', 300, 12, 2, 20, 0)

  expect(result).toBe(20) // empty string returns lineHeight + inputPadding * 2
})

test('getInputHeight - handles large height values', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 200,
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetInputHeight.getInputHeight(
    'very long input with many lines\nthat should result in a large height\nfor testing purposes',
    500,
    'Arial',
    500,
    18,
    0,
    40,
    0,
  )

  expect(result).toBe(200)
})

test('getInputHeight - handles zero height', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 0,
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetInputHeight.getInputHeight('test', 200, 'Arial', 400, 14, 0, 30, 0)

  expect(result).toBe(0)
})
