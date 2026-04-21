import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-invalid-left-valid-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-invalid.svg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-invalid-left-valid-right.svg`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left-invalid.svg<->${tmpDir}/image-invalid-left-valid-right.svg`)

  const beforePane = Locator('.DiffPane--before')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expect(beforePane).toContainText('Failed to load image: left-invalid.svg')
  await api.expect(afterImage).toHaveAttribute('alt', 'right-valid.svg')
  await api.expect(afterImage).toHaveAttribute('src', /^data:image\/svg\+xml;/ as unknown as string)
}
