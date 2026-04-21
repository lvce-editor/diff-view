import type { LoadedFileContent } from '../LoadedFileContent/LoadedFileContent.ts'
import { loadFileContent } from '../LoadFileContent/LoadFileContent.ts'

export const loadFileContents = async (uriLeft: string, uriRight: string): Promise<readonly [LoadedFileContent, LoadedFileContent]> => {
  return Promise.all([loadFileContent(uriLeft), loadFileContent(uriRight)])
}
