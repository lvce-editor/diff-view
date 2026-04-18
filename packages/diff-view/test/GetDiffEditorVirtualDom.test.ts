import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getDiffEditorVirtualDom } from '../src/parts/GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

test('getDiffEditorVirtualDom renders left and right lines inside EditorRow wrappers', (): void => {
<<<<<<< HEAD
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content\nsecond-before',
    contentRight: 'after-content\nsecond-after',
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })
=======
  const result = getDiffEditorVirtualDom('before-content\nsecond-before', 'after-content\nsecond-after', 'text', 'text', '/tmp/before.txt', '/tmp/after.txt', 0, 2, 2)
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)

  expect(result).toEqual([
    {
<<<<<<< HEAD
      childCount: 4,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
=======
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
>>>>>>> origin/main
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    {
<<<<<<< HEAD
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
=======
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
>>>>>>> origin/main
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
      childCount: 2,
      className: ClassNames.DiffEditorRows,
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
      childCount: 4,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
<<<<<<< HEAD
      childCount: 0,
      className: ClassNames.DiffEditorSpacerTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
=======
      childCount: 2,
      className: ClassNames.DiffEditorGutter,
>>>>>>> origin/main
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
      childCount: 2,
      className: ClassNames.DiffEditorRows,
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
  ])
})

test('getDiffEditorVirtualDom omits line number gutters when disabled in state', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: 'after-content',
    lineNumbers: false,
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
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
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('before-content'),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: 11,
      type: VirtualDomElements.Div,
    },
    {
<<<<<<< HEAD
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
=======
      childCount: 1,
      className: ClassNames.DiffEditorContent,
>>>>>>> origin/main
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
<<<<<<< HEAD
      className: ClassNames.ScrollBar,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      name: 'scrollBarThumb',
      onPointerDown: 14,
      type: VirtualDomElements.Div,
    },
=======
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('after-content'),
>>>>>>> origin/main
  ])
})

test('getDiffEditorVirtualDom renders image panes when render mode is image', (): void => {
<<<<<<< HEAD
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'ignored-left-content',
    contentRight: 'after-content',
    renderModeLeft: 'image',
    uriLeft: '/tmp/before.png',
    uriRight: '/tmp/after.txt',
  })
=======
  const result = getDiffEditorVirtualDom('ignored-left-content', 'after-content', 'image', 'text', '/tmp/before.png', '/tmp/after.txt', 0, 1, 1)
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)

  expect(result).toEqual([
    {
<<<<<<< HEAD
      childCount: 4,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
=======
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
>>>>>>> origin/main
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
      src: 'file:///tmp/before.png',
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
<<<<<<< HEAD
    {
      childCount: 0,
      text: 'after-content',
      type: 12,
    },
    {
      childCount: 0,
      className: ClassNames.DiffEditorSpacerBottom,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ScrollBar,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      name: 'scrollBarThumb',
      onPointerDown: 14,
      type: VirtualDomElements.Div,
    },
=======
    text('after-content'),
>>>>>>> origin/main
  ])
})

test('getDiffEditorVirtualDom renders pane errors without crashing', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: '',
    errorRightMessage: 'file not found',
    errorRightStack: 'Error: file not found\n    at read missing file',
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/missing.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorHorizontal}`,
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
      childCount: 1,
      className: ClassNames.DiffEditorRows,
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
      childCount: 1,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    text('Error: file not found\n    at read missing file'),
  ])
})

test('getDiffEditorVirtualDom renders a horizontal sash for vertical layout', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: 'after-content',
    layout: 'vertical',
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result[0]).toEqual({
    childCount: 3,
    className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${ClassNames.DiffEditorVertical}`,
    type: VirtualDomElements.Div,
  })
  expect(result[9]).toEqual({
    childCount: 0,
    className: `${ClassNames.Sash} ${ClassNames.SashHorizontal}`,
    name: 'sash',
    onPointerDown: 11,
    type: VirtualDomElements.Div,
  })
})
