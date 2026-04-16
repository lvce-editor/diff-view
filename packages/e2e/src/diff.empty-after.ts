export const name = 'diff.empty-after'

export const test = async ({ Command, FileSystem, Main, WebView, expect }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.diffproto`, 'fixture')
  await Command.execute('DiffView.setFixture', 'empty-after')

  await Main.openUri(`${tmpDir}/fixture.diffproto`)

  const webView = await WebView.fromId('diff-prototype')
  const deletedRow = webView.locator('.DiffPane--before .DiffRow--deleted')
  const afterEmpty = webView.locator('.DiffPane--after .DiffEmptyState')

  await expect(deletedRow).toBeVisible()
  await expect(deletedRow).toContainText('const value = 42')
  await expect(afterEmpty).toHaveText('No current content')
}