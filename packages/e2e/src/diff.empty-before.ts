import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before'

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'empty-before')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const root = webView.locator('.DiffPrototype')
  const beforeEmpty = webView.locator('.DiffPane--before .DiffEmptyState')
  const insertedRow = webView.locator('.DiffPane--after .DiffRow--inserted')

  await expect(root).toBeVisible()
  await expect(beforeEmpty).toHaveText('No previous content')
  await expect(insertedRow).toBeVisible()
  await expect(insertedRow).toContainText('const value = 42')
}
