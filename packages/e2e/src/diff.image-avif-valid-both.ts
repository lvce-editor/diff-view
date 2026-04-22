import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-avif-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.avif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-avif-valid-both.avif`, 'fixture')

  await DiffView.open(`${tmpDir}/left.avif`, `${tmpDir}/image-avif-valid-both.avif`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.avif')
  await api.expect(beforeImage).toHaveAttribute('src', /^blob:/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.avif')
  await api.expect(afterImage).toHaveAttribute('src', /^blob:/ as unknown as string)
}
