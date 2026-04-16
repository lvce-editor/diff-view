import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getTextHeight = async (
  input: string,
  width: number,
  fontFamily: string,
  fontSize: number,
  fontWeight: number,
  letterSpacing: number,
  lineHeight: number,
  inputPadding: number,
): Promise<number> => {
  try {
    if (!input) {
      return lineHeight + inputPadding * 2
    }
    const actualInput = input
    // TODO line height could also be like 1.5
    const lineHeightPx = `${lineHeight}px`
    // @ts-ignore
    const height = await RendererWorker.invoke(`MeasureTextHeight.measureTextBlockHeight`, actualInput, fontFamily, fontSize, lineHeightPx, width)
    return height + inputPadding * 2
  } catch {
    // fallback
    const lines = input.split('\n')
    const lineCount = lines.length
    const inputHeight = lineCount * lineHeight + inputPadding * 2
    return inputHeight
  }
}
