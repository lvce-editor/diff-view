import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-avif-valid-both'
export const skip = 1
export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.avif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-avif-valid-both.avif`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.avif<->${tmpDir}/image-avif-valid-both.avif`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.avif')
  await api.expect(beforeImage).toHaveAttribute('src', /^data:image\/avif;base64,/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.avif')
  await api.expect(afterImage).toHaveAttribute('src', /^data:image\/avif;base64,/ as unknown as string)
}
