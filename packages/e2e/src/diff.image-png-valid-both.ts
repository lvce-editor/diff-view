import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-png-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-png-valid-both.png`, 'fixture')

  await DiffView.open(`${tmpDir}/left.png`, `${tmpDir}/image-png-valid-both.png`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.png')
  await api.expect(beforeImage).toHaveAttribute('src', /^blob:/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.png')
  await api.expect(afterImage).toHaveAttribute('src', /^blob:/ as unknown as string)
}
