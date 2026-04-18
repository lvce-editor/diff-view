import { readFile } from '../ReadFile/ReadFile.ts'

export const loadFileContents = async (uriLeft: string, uriRight: string): Promise<readonly [string, string]> => {
  return Promise.all([readFile(uriLeft), readFile(uriRight)])
}