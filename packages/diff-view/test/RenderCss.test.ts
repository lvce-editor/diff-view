import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss renders left and right widths as css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 20,
    finalDeltaY: 140,
    height: 100,
    id: 1,
    itemHeight: 20,
    leftWidth: 120,
    maxLineY: 6,
    minLineY: 1,
    rightWidth: 176,
    scrollBarHeight: 40,
    totalLineCount: 10,
  }

  const result = renderCss(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetCss)
  expect(result[1]).toBe(1)
  expect(result[2]).toContain('--LeftWidth: 120px;')
  expect(result[2]).toContain('--RightWidth: 176px;')
  expect(result[2]).toContain('--TopSpacerHeight: 20px;')
  expect(result[2]).toContain('--BottomSpacerHeight: 80px;')
  expect(result[2]).toContain('--ScrollBarHeight: 40px;')
  expect(result[2]).toContain('.DiffEditorHorizontal {')
  expect(result[2]).toContain('.DiffEditorVertical {')
  expect(result[2]).toContain('.DiffEditor .Deletion {')
  expect(result[2]).toContain('.DiffEditor .Insertion {')
  expect(result[2]).toContain('.DiffEditorErrorStack {')
  expect(result[2]).toContain('border-left: 3px solid rgba(248, 81, 73, 0.6);')
  expect(result[2]).toContain('overflow: auto;')
  expect(result[2]).toContain('.DiffEditorSpacerTop {')
  expect(result[2]).toContain('.ScrollBarThumb {')
})

test('renderCss renders stacked pane heights for vertical layout', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 0,
    finalDeltaY: 0,
    height: 100,
    id: 1,
    itemHeight: 20,
    layout: 'vertical' as const,
    leftWidth: 120,
    maxLineY: 0,
    minLineY: 0,
    rightWidth: 176,
    scrollBarHeight: 0,
    totalLineCount: 1,
  }

  const result = renderCss(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetCss)
  expect(result[1]).toBe(1)
  expect(result[2]).toContain('--DiffEditorHeight: 100px;')
  expect(result[2]).toContain('.DiffEditorVertical {')
  expect(result[2]).toContain('height: var(--LeftWidth);')
  expect(result[2]).toContain('height: var(--RightWidth);')
  expect(result[2]).toContain('.SashHorizontal {')
})

test('renderCss includes inline diff styling hooks', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    diffMode: 'inline' as const,
    id: 1,
  }

  const result = renderCss(oldState, newState)

  expect(result[2]).toContain('.InlineDiffEditor {')
  expect(result[2]).toContain('.InlineDiffEditorContent {')
  expect(result[2]).toContain('.Insertion {')
  expect(result[2]).toContain('.Deletion {')
})
