export const InlineDiffRowType = {
  Context: 'context',
  Deletion: 'deletion',
  GitButtons: 'git-buttons',
  IncomingChange: 'incoming-change',
  Insertion: 'insertion',
} as const

export type InlineDiffRowType = (typeof InlineDiffRowType)[keyof typeof InlineDiffRowType]
