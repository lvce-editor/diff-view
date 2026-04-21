import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-text-left-image-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-text-left-image-right.png`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.txt<->${tmpDir}/image-text-left-image-right.png`)

  const beforePane = Locator('.DiffPane--before')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expect(beforePane).toContainText('const leftValue = 42')
  await api.expect(afterImage).toHaveAttribute('alt', 'right.png')
  await api.expect(afterImage).toHaveAttribute('src', /^blob:/ as unknown as string)
}
