export const InlineDiffRowType = {
  Context: 'context',
  Deletion: 'deletion',
  Insertion: 'insertion',
} as const

export type InlineDiffRowType = (typeof InlineDiffRowType)[keyof typeof InlineDiffRowType]
