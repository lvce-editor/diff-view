export interface LoadedFileContents {
  readonly contentLeft: string
  readonly contentRight: string
  readonly errorLeftCodeFrame: string
  readonly errorLeftMessage: string
  readonly errorLeftStack: string
  readonly errorRightCodeFrame: string
  readonly errorRightMessage: string
  readonly errorRightStack: string
}
