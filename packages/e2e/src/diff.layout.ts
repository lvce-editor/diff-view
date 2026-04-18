import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.layout'
export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'one-char-change')
  await Command.execute('DiffView.setLayout', 'horizontal')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const horizontalRoot = webView.locator('.DiffPrototypeLayout--horizontal')
  const horizontalSash = webView.locator('.SashVertical')

  await expect(horizontalRoot).toBeVisible()
  await expect(horizontalSash).toHaveCount(1)

  await Command.execute('DiffView.setLayout', 'vertical')

  const verticalRoot = webView.locator('.DiffPrototypeLayout--vertical')
  const verticalSash = webView.locator('.SashHorizontal')

  await expect(verticalRoot).toBeVisible()
  await expect(verticalSash).toHaveCount(1)
}
