import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDiffEditorVirtualDom } from '../src/parts/GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

test('getDiffEditorVirtualDom renders left and right lines inside EditorRow wrappers', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content\nsecond-before',
    contentRight: 'after-content\nsecond-after',
    maxLineY: 2,
    totalLineCount: 2,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2'),
    {
      childCount: 4,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second-before'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2'),
    {
      childCount: 4,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('second-after'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDiffEditorVirtualDom omits line number gutters when disabled in state', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: 'after-content',
    lineNumbers: false,
    maxLineY: 1,
    totalLineCount: 1,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test.skip('getDiffEditorVirtualDom renders image panes when render mode is image', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'ignored-left-content',
    contentRight: 'after-content',
    imageSrcLeft: 'blob:before.png',
    maxLineY: 1,
    renderModeLeft: 'image',
    totalLineCount: 1,
    uriLeft: '/tmp/before.png',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ImageContent,
      type: VirtualDomElements.Div,
    },
    {
      alt: '/tmp/before.png',
      childCount: 0,
      className: ClassNames.ImageElement,
      src: 'blob:before.png',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDiffEditorVirtualDom only renders existing gutter numbers for an empty left pane', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: '',
    contentRight: 'after-1\nafter-2\nafter-3',
    maxLineY: 3,
    totalLineCount: 3,
    totalLineCountLeft: 1,
    totalLineCountRight: 3,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result.slice(0, 12)).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 3,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDiffEditorVirtualDom renders pane errors without crashing', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: '',
    errorRightMessage: 'file not found',
    errorRightStack: 'Error: file not found\n    at read missing file',
    maxLineY: 1,
    totalLineCount: 1,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/missing.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1'),
    {
      childCount: 3,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: `${ClassNames.DiffEditorContentRight} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text('file not found'),
    {
      childCount: 2,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found'),
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text('    at read missing file '),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href: 'file:///tmp/missing-file.js',
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('(missing-file.js)'),
  ])
})

test('getDiffEditorVirtualDom renders inline mode as a single combined diff pane', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'same\nbefore\nshared',
    contentRight: 'same\nafter\nshared',
    diffMode: 'inline',
    maxLineY: 4,
    totalLineCount: 4,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.InlineDiffEditor}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.InlineDiffEditorContent}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('1 1'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('2 -'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('- 2'),
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text('3 3'),
    {
      childCount: 6,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('  same'),
    {
      childCount: 1,
      className: ClassNames.EditorRowDeletion,
      type: VirtualDomElements.Div,
    },
    text('- before'),
    {
      childCount: 1,
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    text('+ after'),
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('  shared'),
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDiffEditorVirtualDom renders a horizontal sash for vertical layout', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: 'after-content',
    layout: 'vertical',
    maxLineY: 1,
    totalLineCount: 1,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result[0]).toEqual({
    childCount: 3,
    className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorVertical}`,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    onWheel: DomEventListenerFunctions.HandleWheel,
    type: VirtualDomElements.Div,
  })
  expect(result[11]).toEqual({
    childCount: 0,
    className: `${ClassNames.Sash} ${ClassNames.SashHorizontal}`,
    name: 'sash',
    onPointerDown: 11,
    type: VirtualDomElements.Div,
  })
})

test('getDiffEditorVirtualDom renders diff-worker rows with deletion and insertion styling', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'shared-line\ndeleted-line',
    contentRight: 'shared-line\nadded-line',
    inlineChanges: [
      { leftIndex: 0, rightIndex: 0, type: 0 },
      { leftIndex: 1, rightIndex: 1, type: 2 },
      { leftIndex: 1, rightIndex: 1, type: 1 },
    ],
    maxLineY: 3,
    totalLineCount: 3,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toContainEqual({
    childCount: 1,
    className: ClassNames.EditorRowDeletion,
    type: VirtualDomElements.Div,
  })
  expect(result).toContainEqual(text('deleted-line'))
  expect(result).toContainEqual({
    childCount: 1,
    className: ClassNames.EditorRowInsertion,
    type: VirtualDomElements.Div,
  })
  expect(result).toContainEqual(text('added-line'))
  expect(result.filter((node) => 'text' in node && node.text === '')).toHaveLength(2)
})
