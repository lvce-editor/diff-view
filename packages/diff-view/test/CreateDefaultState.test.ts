import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('createDefaultState sets up image render defaults', (): void => {
  const result = createDefaultState()

  expect(result.inlineChanges).toEqual([])
  expect(result.knownImageExtensions).toEqual(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg', '.bmp', '.ico'])
  expect(result.lineNumbers).toBe(true)
  expect(result.layout).toBe('horizontal')
  expect(result.renderModeLeft).toBe('text')
  expect(result.renderModeRight).toBe('text')
})
