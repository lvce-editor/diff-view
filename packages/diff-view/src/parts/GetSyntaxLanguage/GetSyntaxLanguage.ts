import { getPath } from '../GetPath/GetPath.ts'
import { getProtocol } from '../GetProtocol/GetProtocol.ts'

export interface SyntaxLanguageContribution {
  readonly extensions?: readonly string[]
  readonly fileNames?: readonly string[]
  readonly id: string
  readonly tokenize?: string
}

export interface SyntaxLanguageInfo {
  readonly languageId: string
  readonly tokenizerPath: string
}

const getFileName = (uri: string): string => {
  const protocol = getProtocol(uri)
  const path = getPath(protocol, uri).split(/[?#]/, 1)[0]
  const lastSlashIndex = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  if (lastSlashIndex === -1) {
    return path
  }
  return path.slice(lastSlashIndex + 1)
}

const getExtensionIndexes = (fileName: string): readonly [number, number] => {
  const lastIndex = fileName.lastIndexOf('.')
  if (lastIndex === -1) {
    return [-1, -1]
  }
  return [lastIndex, fileName.lastIndexOf('.', lastIndex - 1)]
}

const hasMatchingExtension = (language: SyntaxLanguageContribution, extension: string): boolean => {
  if (!extension || !language.extensions) {
    return false
  }
  const extensionLower = extension.toLowerCase()
  return language.extensions.some((value) => value.toLowerCase() === extensionLower)
}

const hasMatchingFileName = (language: SyntaxLanguageContribution, fileName: string): boolean => {
  if (!fileName || !language.fileNames) {
    return false
  }
  const fileNameLower = fileName.toLowerCase()
  return language.fileNames.some((value) => value.toLowerCase() === fileNameLower)
}

export const getSyntaxLanguage = (uri: string, languages: readonly SyntaxLanguageContribution[]): SyntaxLanguageInfo => {
  const fileName = getFileName(uri)
  if (!fileName) {
    return {
      languageId: 'unknown',
      tokenizerPath: '',
    }
  }
  const [lastExtensionIndex, secondExtensionIndex] = getExtensionIndexes(fileName)
  const extension = lastExtensionIndex === -1 ? '' : fileName.slice(lastExtensionIndex)
  const secondExtension = secondExtensionIndex === -1 ? '' : fileName.slice(secondExtensionIndex)
  for (const language of languages) {
    if (hasMatchingExtension(language, extension) || hasMatchingExtension(language, secondExtension) || hasMatchingFileName(language, fileName)) {
      return {
        languageId: language.id,
        tokenizerPath: language.tokenize || '',
      }
    }
  }
  return {
    languageId: 'unknown',
    tokenizerPath: '',
  }
}
