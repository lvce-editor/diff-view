import { expect, test } from '@jest/globals'
import { getSyntaxLanguage } from '../src/parts/GetSyntaxLanguage/GetSyntaxLanguage.ts'

const languages = [
  { id: 'typescript', extensions: ['.ts'], tokenize: 'typescript' },
  { id: 'javascript', extensions: ['.js'], tokenize: 'javascript' },
  { id: 'json', extensions: ['.json'], tokenize: 'json' },
  { id: 'markdown', extensions: ['.md'], tokenize: 'markdown' },
  { id: 'env', fileNames: ['.env'], tokenize: 'env' },
  { id: 'dockerfile', fileNames: ['Dockerfile'], tokenize: 'dockerfile' },
]

test('getSyntaxLanguage returns the correct language for a .ts file', (): void => {
  const result = getSyntaxLanguage('file.ts', languages)
  expect(result).toEqual({ languageId: 'typescript', tokenizerPath: 'typescript' })
})

test('getSyntaxLanguage returns the correct language for a .js file', (): void => {
  const result = getSyntaxLanguage('file.js', languages)
  expect(result).toEqual({ languageId: 'javascript', tokenizerPath: 'javascript' })
})

test('getSyntaxLanguage returns unknown for file without extension', (): void => {
  const result = getSyntaxLanguage('Makefile', languages)
  expect(result).toEqual({ languageId: 'unknown', tokenizerPath: '' })
})

test('getSyntaxLanguage matches by file name', (): void => {
  const result = getSyntaxLanguage('/path/to/Dockerfile', languages)
  expect(result).toEqual({ languageId: 'dockerfile', tokenizerPath: 'dockerfile' })
})

test('getSyntaxLanguage handles extension case insensitivity', (): void => {
  const result = getSyntaxLanguage('File.TS', languages)
  expect(result).toEqual({ languageId: 'typescript', tokenizerPath: 'typescript' })
})

test('getSyntaxLanguage handles second extension for .test.ts files', (): void => {
  const result = getSyntaxLanguage('file.test.ts', languages)
  expect(result).toEqual({ languageId: 'typescript', tokenizerPath: 'typescript' })
})

test('getSyntaxLanguage handles uri with query string', (): void => {
  const result = getSyntaxLanguage('file.ts?query=1', languages)
  expect(result).toEqual({ languageId: 'typescript', tokenizerPath: 'typescript' })
})

test('getSyntaxLanguage handles empty languages list', (): void => {
  const result = getSyntaxLanguage('file.ts', [])
  expect(result).toEqual({ languageId: 'unknown', tokenizerPath: '' })
})

test('getSyntaxLanguage handles language with no tokenizer', (): void => {
  const result = getSyntaxLanguage('custom.ext', [{ id: 'custom', extensions: ['.ext'] }])
  expect(result).toEqual({ languageId: 'custom', tokenizerPath: '' })
})
