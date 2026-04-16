export const name = 'diff.mixed-chunks'

export const test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.diffproto`, 'fixture')
  await Command.execute('DiffView.setFixture', 'mixed-chunks')

  await Main.openUri(`${tmpDir}/fixture.diffproto`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')
  const insertedRows = webView.locator('.DiffPane--after .DiffRow--inserted')
  const deletedRows = webView.locator('.DiffPane--before .DiffRow--deleted')

  await expect(insertedRows).toHaveCount(2)
  await expect(deletedRows).toHaveCount(2)
  await expect(beforePane).toContainText('legacyHeader')
  await expect(afterPane).toContainText('heroBanner')
}
