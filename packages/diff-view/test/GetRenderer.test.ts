import { test, expect } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderCss from '../src/parts/RenderCss/RenderCss.ts'
import * as RenderFocusContext from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('getRenderer - returns RenderItems.renderItems for DiffType.RenderItems', () => {
  const result = GetRenderer.getRenderer(DiffType.RenderItems)
  expect(result).toBe(RenderItems.renderItems)
})

test('getRenderer - returns RenderValue.renderValue for DiffType.RenderValue', () => {
  const result = GetRenderer.getRenderer(DiffType.RenderValue)
  expect(result).toBe(RenderValue.renderValue)
})

test('getRenderer - returns RenderCss.renderCss for DiffType.RenderCss', () => {
  const result = GetRenderer.getRenderer(DiffType.RenderCss)
  expect(result).toBe(RenderCss.renderCss)
})

test('getRenderer - returns RenderFocusContext.renderFocusContext for DiffType.RenderFocusContext', () => {
  const result = GetRenderer.getRenderer(DiffType.RenderFocusContext)
  expect(result).toBe(RenderFocusContext.renderFocusContext)
})

test('getRenderer - throws error for unknown diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(999)
  }).toThrow('unknown renderer')
})

test('getRenderer - throws error for negative diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(-1)
  }).toThrow('unknown renderer')
})

test('getRenderer - throws error for zero diff type', () => {
  expect(() => {
    GetRenderer.getRenderer(0)
  }).toThrow('unknown renderer')
})
