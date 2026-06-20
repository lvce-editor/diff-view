import { getFileExtension } from '../GetFileExtension/GetFileExtension.ts'

export const getRenderMode = (uri: string, knownImageExtensions: readonly string[]): 'text' | 'image' => {
  const extension = getFileExtension(uri)
  if (knownImageExtensions.includes(extension)) {
    return 'image'
  }
  return 'text'
}
