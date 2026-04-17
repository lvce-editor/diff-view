import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change'
export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'long-inline-change')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const changedTokens = webView.locator('.DiffToken--changed')
  const hero = webView.locator('.DiffHero')

  await expect(hero).toContainText('Long Inline Change')
  await expect(changedTokens).toHaveCount(4)
  await expect(webView.locator('.DiffPane--before')).toContainText('loadUserProfileSummary')
  await expect(webView.locator('.DiffPane--after')).toContainText('loadUserProfileCard')
}
