import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change-pane-highlights'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'long-inline-change')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(beforePane.locator('.DiffToken--changed')).toHaveCount(2)
  await expect(afterPane.locator('.DiffToken--changed')).toHaveCount(2)
  await expect(beforePane).not.toContainText('loadUserProfileCard')
  await expect(afterPane).not.toContainText('loadUserProfileSummary')
}
