export const name = 'diff.one-char-change'

export const test = async ({ Command, FileSystem, Main, WebView, expect }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.diffproto`, 'fixture')
  await Command.execute('DiffView.setFixture', 'one-char-change')

  await Main.openUri(`${tmpDir}/fixture.diffproto`)

  const webView = await WebView.fromId('diff-prototype')
  const changedTokens = webView.locator('.DiffToken--changed')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')
  await expect(changedTokens).toHaveCount(2)
}