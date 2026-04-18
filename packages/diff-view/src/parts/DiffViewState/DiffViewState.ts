export type RenderMode = 'text' | 'image'

export interface DiffViewState {
  readonly assetDir: string
  readonly contentLeft: string
  readonly contentRight: string
  readonly deltaY: number
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly id: number
  readonly initial: boolean
  readonly inputSource: number
  readonly inputValue: string
  readonly isResizing: boolean
  readonly isVisible: boolean
  readonly itemHeight: number
  readonly knownImageExtensions: readonly string[]
  readonly leftWidth: number
  readonly maxInputLines: number
  readonly maxLineY: number
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly renderModeLeft: RenderMode
  readonly renderModeRight: RenderMode
  readonly resizeOffsetX: number
  readonly rightWidth: number
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly uri: string
  readonly uriLeft: string
  readonly uriRight: string
  readonly viewMode: number
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
