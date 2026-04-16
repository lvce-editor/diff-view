import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-after'

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'empty-after')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const deletedRow = webView.locator('.DiffPane--before .DiffRow--deleted')
  const afterEmpty = webView.locator('.DiffPane--after .DiffEmptyState')

  await expect(deletedRow).toBeVisible()
  await expect(deletedRow).toContainText('const value = 42')
  await expect(afterEmpty).toHaveText('No current content')
}
