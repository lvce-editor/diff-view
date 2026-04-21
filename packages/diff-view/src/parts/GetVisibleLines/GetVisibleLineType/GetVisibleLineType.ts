import type { InlineDiffChange } from '../../InlineDiffChange/InlineDiffChange.ts'
import type { VisibleLineType } from '../../VisibleLine/VisibleLine.ts'
import * as InlineDiffChangeType from '../../InlineDiffChangeType/InlineDiffChangeType.ts'
import { VisibleLineType as VisibleLineTypeValue } from '../../VisibleLine/VisibleLine.ts'

export const getVisibleLineType = (inlineChange: InlineDiffChange, side: 'left' | 'right'): VisibleLineType => {
  switch (inlineChange.type) {
    case InlineDiffChangeType.Deletion:
      return side === 'left' ? VisibleLineTypeValue.Removed : VisibleLineTypeValue.Normal
    case InlineDiffChangeType.Insertion:
      return side === 'right' ? VisibleLineTypeValue.Added : VisibleLineTypeValue.Normal
    case InlineDiffChangeType.None:
      return VisibleLineTypeValue.Normal
    default:
      return VisibleLineTypeValue.Normal
  }
}
