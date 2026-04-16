export interface DiffViewState {
  readonly assetDir: string
  readonly badgeCount: number
  readonly decorationIcons: readonly string[]
  readonly deltaY: number
  readonly enabledProviderIds: readonly string[]
  readonly expandedGroups: Readonly<Record<string, boolean>>
  readonly finalDeltaY: number
  readonly focus: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly history: readonly string[]
  readonly iconDefinitions: readonly string[]
  readonly id: number
  readonly index: readonly any[]
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
  readonly maxInputLines: number
  readonly maxLineY: number
  readonly merge: readonly any[]
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly platform: number
  readonly providerId: string
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly untracked: readonly any[]
  readonly width: number
  readonly workingTree: readonly any[]
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
