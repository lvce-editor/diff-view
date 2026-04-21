import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-image-left-text-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/image-left-text-right.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/right.txt`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/image-left-text-right.png<->${tmpDir}/right.txt`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterPane = Locator('.DiffPane--after')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.png')
  await api.expect(beforeImage).toHaveAttribute('src', /^data:image\/png;base64,/ as unknown as string)
  await expect(afterPane).toContainText('const rightValue = 42')
}
