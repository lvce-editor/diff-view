export interface DiffViewState {
  readonly assetDir: string
  readonly deltaY: number
  readonly enabledProviderIds: readonly string[]
  readonly expandedGroups: Record<string, boolean>
  readonly fileIconCache: Record<string, unknown>
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly history: readonly unknown[]
  readonly id: number
  readonly index: readonly unknown[]
  readonly initial: boolean
  readonly inputBoxHeight: number
  readonly inputBoxMaxHeight: number
  readonly inputFontFamily: string
  readonly inputFontSize: number
  readonly inputFontWeight: number
  readonly inputLetterSpacing: number
  readonly inputLineHeight: number
  readonly inputPadding: number
  readonly inputPlaceholder: string
  readonly inputSource: number
  readonly inputValue: string
  readonly isVisible: boolean
  readonly itemHeight: number
  readonly items: readonly unknown[]
  readonly maxLineY: number
  readonly maxInputLines: number
  readonly merge: readonly unknown[]
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly untracked: readonly unknown[]
  readonly viewMode: number
  readonly visibleItems: readonly unknown[]
  readonly width: number
  readonly workingTree: readonly unknown[]
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
