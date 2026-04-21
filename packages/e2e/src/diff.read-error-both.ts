import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.read-error-both'

export const skip = 1

const errorMessage = 'Failed to execute file system provider: no file system provider for protocol "memfs" found'

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'read-error-both')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforeError = webView.locator('.DiffPane--before .DiffErrorMessage')
  const afterError = webView.locator('.DiffPane--after .DiffErrorMessage')
  const errorStacks = webView.locator('.DiffErrorStack')

  await expect(beforeError).toHaveText(errorMessage)
  await expect(afterError).toHaveText(errorMessage)
  await expect(errorStacks).toHaveCount(2)
}
