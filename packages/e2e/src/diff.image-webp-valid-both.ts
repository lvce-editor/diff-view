import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-webp-valid-both'

export const skip = 1
export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.webp`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-webp-valid-both.webp`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.webp<->${tmpDir}/image-webp-valid-both.webp`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.webp')
  await api.expect(beforeImage).toHaveAttribute('src', /^blob:/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.webp')
  await api.expect(afterImage).toHaveAttribute('src', /^blob:/ as unknown as string)
}
