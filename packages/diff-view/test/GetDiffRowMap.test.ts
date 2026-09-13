import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getCursorPositionFromCoordinates } from '../src/parts/GetCursorPositionFromCoordinates/GetCursorPositionFromCoordinates.ts'
import { getDiffRowMap } from '../src/parts/GetDiffRowMap/GetDiffRowMap.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

const deletedLineState = {
  ...createDefaultState(),
  contentLeft: 'first\ndeleted\nlast',
  contentRight: 'first\nlast',
  inlineChanges: [
    { leftIndex: 0, rightIndex: 0, type: 0 },
    { leftIndex: 1, rightIndex: 1, type: 2 },
    { leftIndex: 2, rightIndex: 1, type: 0 },
  ],
  totalLineCountLeft: 3,
  totalLineCountRight: 2,
}

test('side-by-side maps gaps without treating them as document lines', () => {
  const map = getDiffRowMap(deletedLineState)
  expect(map.left.displayToDocument).toEqual([0, 1, 2])
  expect(map.right.displayToDocument).toEqual([0, null, 1])
  expect(map.right.documentToDisplay).toEqual([0, 2])
})

test('clicking after a gap and rendering the cursor round trips through document coordinates', () => {
  const position = getCursorPositionFromCoordinates(deletedLineState, 1000, 40)
  expect(position).toEqual({ cursorColumnIndex: 4, cursorRowIndex: 1 })
  const state = { ...deletedLineState, rightEditor: position }
  expect(renderCss(state, state)[2]).toContain('--CursorTop: 40px;')
})

test('clicking a gap uses the following document line', () => {
  expect(getCursorPositionFromCoordinates(deletedLineState, 1000, 20)).toEqual({ cursorColumnIndex: 4, cursorRowIndex: 1 })
})

test('scrolling preserves the document mapping and relative cursor position', () => {
  const state = { ...deletedLineState, minLineY: 1 }
  const position = getCursorPositionFromCoordinates(state, 1000, 20)
  expect(position.cursorRowIndex).toBe(1)
  expect(renderCss(state, { ...state, rightEditor: position })[2]).toContain('--CursorTop: 20px;')
})

test('trailing gaps clamp to the final document line', () => {
  const state = {
    ...deletedLineState,
    inlineChanges: [
      { leftIndex: 0, rightIndex: 0, type: 0 },
      { leftIndex: 1, rightIndex: 1, type: 0 },
      { leftIndex: 2, rightIndex: 2, type: 2 },
    ],
  }
  expect(getCursorPositionFromCoordinates(state, 1000, 1000).cursorRowIndex).toBe(1)
})

test('inline replacements map each side to its own display row', () => {
  const map = getDiffRowMap({ ...deletedLineState, contentLeft: 'old', contentRight: 'new', diffMode: 'inline' })
  expect(map.left.displayToDocument).toEqual([0, null])
  expect(map.right.displayToDocument).toEqual([null, 0])
  expect(map.left.documentToDisplay).toEqual([0])
  expect(map.right.documentToDisplay).toEqual([1])
})

test('inline conflict action rows do not belong to either document', () => {
  const content = '<<<<<<< HEAD\ncurrent\n=======\nincoming\n>>>>>>> branch'
  const map = getDiffRowMap({ ...deletedLineState, contentLeft: content, contentRight: content, diffMode: 'inline' })
  expect(map.left.displayToDocument).toEqual([null, 0, 1, 2, null, 3, 4])
  expect(map.right.displayToDocument).toEqual(map.left.displayToDocument)
  expect(map.right.documentToDisplay).toEqual([1, 2, 3, 5, 6])
})

test('side-by-side insertions only map to the modified document', () => {
  const map = getDiffRowMap({ ...deletedLineState, inlineChanges: [{ leftIndex: 0, rightIndex: 0, type: 1 }] })
  expect(map.left.displayToDocument).toEqual([null])
  expect(map.right.displayToDocument).toEqual([0])
})

test('a document without diff information uses identity mapping', () => {
  const map = getDiffRowMap({ ...deletedLineState, inlineChanges: [] })
  expect(map.left.documentToDisplay).toEqual([0, 1, 2])
  expect(map.right.documentToDisplay).toEqual([0, 1])
})
