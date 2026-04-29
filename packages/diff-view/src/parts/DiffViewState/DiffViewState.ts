import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'

export type RenderMode = 'text' | 'image'
export type Layout = 'vertical' | 'horizontal'
export type DiffMode = 'inline' | 'side-by-side'

export interface DiffViewState {
  readonly allowedLinkSchemes: readonly string[]
  readonly assetDir: string
  readonly contentLeft: string
  readonly contentRight: string
  readonly deltaY: number
  readonly diffMode: DiffMode
  readonly errorLeftCodeFrame: string
  readonly errorLeftMessage: string
  readonly errorLeftStack: string
  readonly errorRightCodeFrame: string
  readonly errorRightMessage: string
  readonly errorRightStack: string
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly gutterWidthVariable: number
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly id: number
  readonly imageSrcLeft: string
  readonly imageSrcRight: string
  readonly initial: boolean
  readonly inlineChanges: readonly InlineDiffChange[]
  readonly inputSource: number
  readonly inputValue: string
  readonly isResizing: boolean
  readonly isScrollBarDragging: boolean
  readonly isVisible: boolean
  readonly itemHeight: number
  readonly knownImageExtensions: readonly string[]
  readonly languageIdLeft: string
  readonly languageIdRight: string
  readonly layout: Layout
  readonly leftWidth: number
  readonly lineNumbers: boolean
  readonly maxInputLines: number
  readonly maxLineY: number
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly renderModeLeft: RenderMode
  readonly renderModeRight: RenderMode
  readonly resizeOffsetX: number
  readonly resizeOffsetY: number
  readonly rightWidth: number
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarBackgroundImage: string
  readonly scrollBarDragOffsetY: number
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly tokenizedLinesLeft: readonly TokenizedLine[]
  readonly tokenizedLinesRight: readonly TokenizedLine[]
  readonly totalLineCount: number
  readonly totalLineCountLeft: number
  readonly totalLineCountRight: number
  readonly uri: string
  readonly uriLeft: string
  readonly uriRight: string
  readonly viewMode: number
  readonly visibleLinesLeft: readonly VisibleLine[]
  readonly visibleLinesRight: readonly VisibleLine[]
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
