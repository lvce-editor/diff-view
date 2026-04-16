export const name = 'diff.multi-line-replacement'

export const test = async ({ Command, FileSystem, Main, WebView, expect }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.diffproto`, 'fixture')
  await Command.execute('DiffView.setFixture', 'multi-line-replacement')

  await Main.openUri(`${tmpDir}/fixture.diffproto`)

  const webView = await WebView.fromId('diff-prototype')
  const deletedRows = webView.locator('.DiffPane--before .DiffRow--deleted')
  const insertedRows = webView.locator('.DiffPane--after .DiffRow--inserted')

  await expect(deletedRows).toHaveCount(2)
  await expect(insertedRows).toHaveCount(2)
  await expect(webView.locator('.DiffPane--before')).toContainText('return oldValue')
  await expect(webView.locator('.DiffPane--after')).toContainText('return nextValue')
}