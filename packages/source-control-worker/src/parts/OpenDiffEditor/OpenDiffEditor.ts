import * as OpenUri from '../OpenUri/OpenUri.ts'

const inlineDiffEditorBreakpoint = 800

export const openDiffEditor = async (before: string, afterPath: string, width: number): Promise<void> => {
  // TODO handle error
  // TODO should only pass uris to diff editor, diff editor should then resolve file contents
  if (width < inlineDiffEditorBreakpoint) {
    await OpenUri.openUri(`inline-diff://data://${before}<->${afterPath}`)
  } else {
    await OpenUri.openUri(`diff://data://${before}<->${afterPath}`)
  }
}
