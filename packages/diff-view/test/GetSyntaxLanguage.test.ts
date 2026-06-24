import { expect, test } from '@jest/globals'
import { getSyntaxLanguage } from '../src/parts/GetSyntaxLanguage/GetSyntaxLanguage.ts'

const languages = [
  { extensions: ['.ts'], id: 'typescript', tokenize: 'typescript' },
  { extensions: ['.js'], id: 'javascript', tokenize: 'javascript' },
  { extensions: ['.json'], id: 'json', tokenize: 'json' },
  { extensions: ['.md'], id: 'markdown', tokenize: 'markdown' },
  { fileNames: ['.env'], id: 'env', tokenize: 'env' },
  { fileNames: ['Dockerfile'], id: 'dockerfile', tokenize: 'dockerfile' },
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
  const result = getSyntaxLanguage('custom.ext', [{ extensions: ['.ext'], id: 'custom' }])
  expect(result).toEqual({ languageId: 'custom', tokenizerPath: '' })
})
