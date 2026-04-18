import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getDiffEditorVirtualDom } from '../src/parts/GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'

test('getDiffEditorVirtualDom renders left and right lines inside EditorRow wrappers', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'before-content\nsecond-before',
    contentRight: 'after-content\nsecond-after',
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
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
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'before-content',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'second-before',
      type: 12,
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
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'after-content',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'second-after',
      type: 12,
    },
  ])
})

test('getDiffEditorVirtualDom renders image panes when render mode is image', (): void => {
  const result = getDiffEditorVirtualDom({
    ...createDefaultState(),
    contentLeft: 'ignored-left-content',
    contentRight: 'after-content',
    renderModeLeft: 'image',
    uriLeft: '/tmp/before.png',
    uriRight: '/tmp/after.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
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
      childCount: 1,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'after-content',
      type: 12,
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
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/missing.txt',
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
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
