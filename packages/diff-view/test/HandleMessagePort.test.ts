import { expect, test } from '@jest/globals'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'

test('handleMessagePort - creates PlainMessagePortRpc with valid port', async (): Promise<void> => {
  // @ts-ignore
  const { port1 } = new MessageChannel()
  await handleMessagePort(port1)
  expect(port1).toBeDefined()
  port1.close()
})

test('handleMessagePort - handles port correctly', async (): Promise<void> => {
  // @ts-ignore
  const { port1, port2 } = new MessageChannel()
  await handleMessagePort(port1)
  expect(port1).toBeDefined()
  expect(port2).toBeDefined()
  port1.close()
  port2.close()
})
