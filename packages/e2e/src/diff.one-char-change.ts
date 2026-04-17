import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.one-char-change'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'one-char-change')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const changedTokens = webView.locator('.DiffToken--changed')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')
  await expect(changedTokens).toHaveCount(2)
}
