import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'

test('getCss includes the shared error styles', (): void => {
  const css = getCss()

  expect(css).toContain('.DiffEditorErrorCodeFrame')
  expect(css).toContain('.DiffEditorErrorStack')
  expect(css).toContain('.DiffEditorErrorStackLink')
  expect(css).toContain('text-underline-offset: 2px;')
})
