import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.multi-line-replacement'
export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'multi-line-replacement')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const deletedRows = webView.locator('.DiffPane--before .DiffRow--deleted')
  const insertedRows = webView.locator('.DiffPane--after .DiffRow--inserted')

  await expect(deletedRows).toHaveCount(2)
  await expect(insertedRows).toHaveCount(2)
  await expect(webView.locator('.DiffPane--before')).toContainText('return oldValue')
  await expect(webView.locator('.DiffPane--after')).toContainText('return nextValue')
}
