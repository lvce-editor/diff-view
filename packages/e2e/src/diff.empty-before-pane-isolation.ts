import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before-pane-isolation'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'empty-before')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')

  await expect(beforePane.locator('.DiffEmptyState')).toHaveText('No previous content')
  await expect(beforePane.locator('.DiffRow--deleted')).toHaveCount(0)
  await expect(afterPane.locator('.DiffRow--inserted')).toHaveCount(1)
}
