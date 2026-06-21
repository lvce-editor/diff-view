import { expect, test } from '@jest/globals'
import { findLookAheadMatch } from '../src/parts/GetInlineDiffRows/FindLookAheadMatch/FindLookAheadMatch.ts'
import { getContextRow } from '../src/parts/GetInlineDiffRows/GetContextRow/GetContextRow.ts'
import { getDeletionRow } from '../src/parts/GetInlineDiffRows/GetDeletionRow/GetDeletionRow.ts'
import { getDeletionRows } from '../src/parts/GetInlineDiffRows/GetDeletionRows/GetDeletionRows.ts'
import { getInlineDiffRows, InlineDiffRowType } from '../src/parts/GetInlineDiffRows/GetInlineDiffRows.ts'
import { getInsertionRow } from '../src/parts/GetInlineDiffRows/GetInsertionRow/GetInsertionRow.ts'
import { getInsertionRows } from '../src/parts/GetInlineDiffRows/GetInsertionRows/GetInsertionRows.ts'
import { getLines } from '../src/parts/GetInlineDiffRows/GetLines/GetLines.ts'
import { getLookAheadRows } from '../src/parts/GetInlineDiffRows/GetLookAheadRows/GetLookAheadRows.ts'

test('getLines splits content into lines', (): void => {
  expect(getLines('a\nb')).toEqual(['a', 'b'])
})

test('getLines returns one empty line for empty content', (): void => {
  expect(getLines('')).toEqual([''])
})

test('findLookAheadMatch finds a matching line within the lookahead limit', (): void => {
  expect(findLookAheadMatch(['a', 'b', 'c', 'd'], 1, 'd')).toBe(3)
})

test('findLookAheadMatch returns -1 when the match is outside the lookahead limit', (): void => {
  expect(findLookAheadMatch(['a', 'b', 'c', 'd', 'e'], 0, 'e')).toBe(-1)
})

test('getContextRow creates a context row', (): void => {
  expect(getContextRow(1, 2, 'same')).toEqual({
    lineNumberLeft: 1,
    lineNumberRight: 2,
    text: 'same',
    type: InlineDiffRowType.Context,
  })
})

test('getDeletionRow creates a deletion row', (): void => {
  expect(getDeletionRow(3, 'removed')).toEqual({
    lineNumberLeft: 3,
    lineNumberRight: null,
    text: 'removed',
    type: InlineDiffRowType.Deletion,
  })
})

test('getInsertionRow creates an insertion row', (): void => {
  expect(getInsertionRow(4, 'added')).toEqual({
    lineNumberLeft: null,
    lineNumberRight: 4,
    text: 'added',
    type: InlineDiffRowType.Insertion,
  })
})

test('getDeletionRows creates deletion rows for a line range', (): void => {
  expect(getDeletionRows(['a', 'b', 'c'], 1, 3, 7)).toEqual([
    {
      lineNumberLeft: 7,
      lineNumberRight: null,
      text: 'b',
      type: InlineDiffRowType.Deletion,
    },
    {
      lineNumberLeft: 8,
      lineNumberRight: null,
      text: 'c',
      type: InlineDiffRowType.Deletion,
    },
  ])
})

test('getInsertionRows creates insertion rows for a line range', (): void => {
  expect(getInsertionRows(['a', 'b', 'c'], 1, 3, 9)).toEqual([
    {
      lineNumberLeft: null,
      lineNumberRight: 9,
      text: 'b',
      type: InlineDiffRowType.Insertion,
    },
    {
      lineNumberLeft: null,
      lineNumberRight: 10,
      text: 'c',
      type: InlineDiffRowType.Insertion,
    },
  ])
})

test('getLookAheadRows returns deletion rows when the right line appears ahead on the left', (): void => {
  expect(getLookAheadRows(['a', 'removed', 'b'], ['a', 'b'], 1, 1, 2, 2)).toEqual({
    leftCount: 1,
    rightCount: 0,
    rows: [
      {
        lineNumberLeft: 2,
        lineNumberRight: null,
        text: 'removed',
        type: InlineDiffRowType.Deletion,
      },
    ],
  })
})

test('getLookAheadRows returns insertion rows when the left line appears ahead on the right', (): void => {
  expect(getLookAheadRows(['a', 'b'], ['a', 'added', 'b'], 1, 1, 2, 2)).toEqual({
    leftCount: 0,
    rightCount: 1,
    rows: [
      {
        lineNumberLeft: null,
        lineNumberRight: 2,
        text: 'added',
        type: InlineDiffRowType.Insertion,
      },
    ],
  })
})

test('getLookAheadRows returns undefined when no lookahead match exists', (): void => {
  expect(getLookAheadRows(['a', 'b'], ['a', 'c'], 1, 1, 2, 2)).toBeUndefined()
})

test('getInlineDiffRows returns context rows for identical content', (): void => {
  expect(getInlineDiffRows('a\nb', 'a\nb')).toEqual([
    {
      lineNumberLeft: 1,
      lineNumberRight: 1,
      text: 'a',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: 2,
      lineNumberRight: 2,
      text: 'b',
      type: InlineDiffRowType.Context,
    },
  ])
})

test('getInlineDiffRows returns deletion and insertion rows for changed content', (): void => {
  expect(getInlineDiffRows('a\nold\nc', 'a\nnew\nc')).toEqual([
    {
      lineNumberLeft: 1,
      lineNumberRight: 1,
      text: 'a',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: 2,
      lineNumberRight: null,
      text: 'old',
      type: InlineDiffRowType.Deletion,
    },
    {
      lineNumberLeft: null,
      lineNumberRight: 2,
      text: 'new',
      type: InlineDiffRowType.Insertion,
    },
    {
      lineNumberLeft: 3,
      lineNumberRight: 3,
      text: 'c',
      type: InlineDiffRowType.Context,
    },
  ])
})

test('getInlineDiffRows uses lookahead rows for inserted lines', (): void => {
  expect(getInlineDiffRows('a\nc', 'a\nb\nc')).toEqual([
    {
      lineNumberLeft: 1,
      lineNumberRight: 1,
      text: 'a',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: null,
      lineNumberRight: 2,
      text: 'b',
      type: InlineDiffRowType.Insertion,
    },
    {
      lineNumberLeft: 2,
      lineNumberRight: 3,
      text: 'c',
      type: InlineDiffRowType.Context,
    },
  ])
})

test('getInlineDiffRows inserts decorator rows for merge conflict markers', (): void => {
  expect(getInlineDiffRows('<<<<<<< HEAD\ncurrent\n=======\nincoming\n>>>>>>> branch', '<<<<<<< HEAD\ncurrent\n=======\nincoming\n>>>>>>> branch')).toEqual([
    {
      lineNumberLeft: null,
      lineNumberRight: null,
      text: 'Accept current change | Accept incoming change | Accept both',
      type: InlineDiffRowType.GitButtons,
    },
    {
      lineNumberLeft: 1,
      lineNumberRight: 1,
      text: '<<<<<<< HEAD',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: 2,
      lineNumberRight: 2,
      text: 'current',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: 3,
      lineNumberRight: 3,
      text: '=======',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: null,
      lineNumberRight: null,
      text: 'Incoming Change',
      type: InlineDiffRowType.IncomingChange,
    },
    {
      lineNumberLeft: 4,
      lineNumberRight: 4,
      text: 'incoming',
      type: InlineDiffRowType.Context,
    },
    {
      lineNumberLeft: 5,
      lineNumberRight: 5,
      text: '>>>>>>> branch',
      type: InlineDiffRowType.Context,
    },
  ])
})
