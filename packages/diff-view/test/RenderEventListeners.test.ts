import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners returns correct event listeners', () => {
  const listeners = renderEventListeners()

  expect(listeners).toBeDefined()
})
