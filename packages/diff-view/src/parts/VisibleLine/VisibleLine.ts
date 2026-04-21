export const VisibleLineType = {
  Added: 3,
  Normal: 1,
  Removed: 2,
} as const

export type VisibleLineType = (typeof VisibleLineType)[keyof typeof VisibleLineType]

export interface VisibleLineToken {
  readonly text: string
  readonly type: string
}

export interface VisibleLine {
  readonly lineNumber: number
  readonly tokens: readonly VisibleLineToken[]
  readonly type: VisibleLineType
}
