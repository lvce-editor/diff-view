import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('renderCss uses cached scroll bar background image from state', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
    scrollBarBackgroundImage: 'linear-gradient(to bottom, transparent 10%, red 10%, red 20%, transparent 20%)',
  }

  const result = renderCss(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetCss)
  expect(result[1]).toBe(1)
  expect(result[2]).toContain('--ScrollBarBackgroundImage: linear-gradient(to bottom, transparent 10%, red 10%, red 20%, transparent 20%);')
})

test('renderCss renders left and right widths as css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 20,
    finalDeltaY: 140,
    height: 100,
    id: 1,
    inlineChanges: [
      { leftIndex: 0, rightIndex: 0, type: 2 },
      { leftIndex: 1, rightIndex: 1, type: 2 },
      { leftIndex: 2, rightIndex: 2, type: 0 },
      { leftIndex: 3, rightIndex: 3, type: 1 },
      { leftIndex: 4, rightIndex: 4, type: 1 },
    ],
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
  expect(result[2]).not.toContain('--DiffEditorSashLeft')
  expect(result[2]).not.toContain('left: var(--DiffEditorSashLeft);')
  expect(result[2]).toContain('--ScrollBarHeight: 40px;')
  expect(result[2]).toContain('--ScrollBarWidth: 44px;')
  expect(result[2]).toContain('.DiffEditorHorizontal {')
  expect(result[2]).toContain('.DiffEditorVertical {')
  expect(result[2]).toContain('.DiffEditorWithSearch.DiffEditorHorizontal,\n.DiffEditorWithSearch.DiffEditorVertical {\n  flex-direction: column;\n}')
  expect(result[2]).toContain('.DiffEditorContent {')
  expect(result[2]).toContain('.DiffEditorContentLeft {')
  expect(result[2]).toContain('.DiffEditorContentRight {')
  expect(result[2]).toContain(
    '.DiffEditorContentLeft,\n.DiffEditorContentRight {\n  align-items: stretch;\n  display: flex;\n  flex: none !important;\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n  position: relative;\n}',
  )
  expect(result[2]).not.toContain('.DiffEditorContent {\n  flex: unset !important')
  expect(result[2]).toContain('user-select: text;')
  expect(result[2]).toContain(
    '.DiffEditorRows {\n  background: var(--DiffBackground);\n  contain: layout paint style;\n  cursor: text;\n  flex: 1 1 auto;\n  font-family: var(--DiffFontFamily, monospace);\n  height: 100%;\n  min-width: 0;\n  overflow: hidden;\n}',
  )
  expect(result[2]).toContain('.DiffEditorInputWrapper {\n  contain: strict;\n  height: 0;\n  position: absolute;\n  width: 0;\n  z-index: 1;\n}')
  expect(result[2]).toContain(
    '.DiffEditorInput {\n  background: transparent;\n  border: 0;\n  color: transparent;\n  cursor: text;\n  height: 0;\n  outline: none;\n  padding: 0;\n  position: absolute;\n  width: 0;\n}',
  )
  expect(result[2]).toContain('.DiffEditorLineNumberEmpty {')
  expect(result[2]).toContain('.DiffEditor .Deletion {')
  expect(result[2]).toContain('.DiffEditor .Insertion {')
  expect(result[2]).toContain('.DiffEditorErrorCodeFrame,')
  expect(result[2]).toContain('.DiffEditorErrorStack {')
  expect(result[2]).toContain('.DiffEditorErrorStackLink {')
  expect(result[2]).toContain('border-left: 3px solid rgba(248, 81, 73, 0.6);')
  expect(result[2]).toContain('overflow: auto;')
  expect(result[2]).toContain('text-underline-offset: 2px;')
  expect(result[2]).toContain('.DiffScrollBarThumb {')
  expect(result[2]).toContain('width: var(--ScrollBarWidth);')
  expect(result[2]).toContain('background-image: var(--ScrollBarBackgroundImage);')
})

test('renderCss uses the default separator width for sash sizing', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
  }

  const result = renderCss(oldState, newState)

  expect(result[2]).toContain('.SashVertical {\n  cursor: col-resize;\n  width: 6px;\n}')
  expect(result[2]).toContain('.SashHorizontal {\n  cursor: row-resize;\n  height: 6px;\n}')
  expect(result[2]).toContain('--DiffSeparatorWidth: 6px;')
  expect(result[2]).toContain('width: var(--DiffSeparatorWidth);')
})

test('renderCss renders height utility classes for empty line numbers', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
    itemHeight: 20,
    visibleLinesLeft: [
      {
        lineNumber: -1,
        tokens: [],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: -1,
        tokens: [],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: -1,
        tokens: [],
        type: VisibleLineType.Normal,
      },
    ],
    visibleLinesRight: [],
  }

  const result = renderCss(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetCss)
  expect(result[1]).toBe(1)
  expect(result[2]).toContain('.Height-60 {')
  expect(result[2]).toContain('  height: 60px;')
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
  expect(result[2]).toContain('flex-direction: row;')
  expect(result[2]).toContain('.Insertion {')
  expect(result[2]).toContain('.Deletion {')
})
