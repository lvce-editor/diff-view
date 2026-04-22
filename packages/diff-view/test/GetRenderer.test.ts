import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'
import { renderValue } from '../src/parts/RenderValue/RenderValue.ts'

test.each([
  [DiffType.RenderCss, renderCss],
  [DiffType.RenderFocusContext, renderFocusContext],
  [DiffType.RenderIncremental, renderIncremental],
  [DiffType.RenderItems, renderItems],
  [DiffType.RenderValue, renderValue],
] as const)('getRenderer maps %s to the expected function', (diffType, expectedRenderer): void => {
  expect(getRenderer(diffType)).toBe(expectedRenderer)
})

test('getRenderer throws for an unknown renderer id', (): void => {
  expect(() => getRenderer(-1)).toThrow('unknown renderer')
})
