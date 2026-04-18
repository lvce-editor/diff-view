import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.layout-preserves-content'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'one-char-change')
  await Command.execute('DiffView.setLayout', 'horizontal')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(webView.locator('.DiffPrototypeLayout--horizontal')).toBeVisible()
  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')

  await Command.execute('DiffView.setLayout', 'vertical')

  await expect(webView.locator('.DiffPrototypeLayout--vertical')).toBeVisible()
  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')
}
