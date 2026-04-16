import { getTextHeight } from '../GetTextHeight/GetTextHeight.ts'

export const getInputHeight = async (
  input: string,
  width: number,
  fontFamily: string,
  fontWeight: number,
  fontSize: number,
  letterSpacing: number,
  lineHeight: number,
  inputPadding: number,
): Promise<number> => {
  const height = await getTextHeight(input, width, fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, inputPadding)
  return height
}
