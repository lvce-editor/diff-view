import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-svg-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.svg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-svg-valid-both.svg`, 'fixture')

  await DiffView.open(`${tmpDir}/left.svg`, `${tmpDir}/image-svg-valid-both.svg`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.svg')
  await api.expect(beforeImage).toHaveAttribute('src', /^blob:/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.svg')
  await api.expect(afterImage).toHaveAttribute('src', /^blob:/ as unknown as string)
}
