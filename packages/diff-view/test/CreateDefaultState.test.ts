import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('createDefaultState sets up image render defaults', (): void => {
  const result = createDefaultState()

  expect(result.inlineChanges).toEqual([])
  expect(result.allowedLinkSchemes).toEqual(['http', 'https', 'file'])
  expect(result.knownImageExtensions).toEqual(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg', '.bmp', '.ico'])
  expect(result.diffMode).toBe('side-by-side')
  expect(result.gutterWidthVariable).toBe(9)
  expect(result.lineNumbers).toBe(true)
  expect(result.layout).toBe('horizontal')
  expect(result.leftEditor).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 0,
  })
  expect(result.renderModeLeft).toBe('text')
  expect(result.renderModeRight).toBe('text')
  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 0,
    cursorRowIndex: 0,
  })
  expect(result.searchVisible).toBe(false)
  expect(result.showWhitespace).toBe(false)
  expect(result.totalLineCountLeft).toBe(1)
  expect(result.totalLineCountRight).toBe(1)
  expect(result.wordWrap).toBe(false)
})
