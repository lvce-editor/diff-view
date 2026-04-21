import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-jpg-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.jpg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-jpg-valid-both.jpg`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.jpg<->${tmpDir}/image-jpg-valid-both.jpg`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.jpg')
  await api.expect(beforeImage).toHaveAttribute('src', /^data:image\/jpeg;base64,/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.jpg')
  await api.expect(afterImage).toHaveAttribute('src', /^data:image\/jpeg;base64,/ as unknown as string)
}
