import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-typescript'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/syntax-highlighting-typescript.txt`, 'fixture')

  await Main.openUri(`${tmpDir}/syntax-highlighting-typescript.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(beforePane.locator('.Token.Keyword')).toHaveCount(1)
  await expect(afterPane.locator('.Token.Keyword')).toHaveCount(1)
  await expect(beforePane.locator('.Token.Numeric')).toHaveCount(1)
  await expect(afterPane.locator('.Token.Numeric')).toHaveCount(1)
  await expect(beforePane).toContainText('const leftValue = 1')
  await expect(afterPane).toContainText('const rightValue = 2')
  await expect(beforePane).not.toContainText('rightValue')
  await expect(afterPane).not.toContainText('leftValue')
}
