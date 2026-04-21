import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-svg-valid-both'

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.svg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-svg-valid-both.svg`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.svg<->${tmpDir}/image-svg-valid-both.svg`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await api.expect(beforeImage).toHaveAttribute('alt', 'left.svg')
  await api.expect(beforeImage).toHaveAttribute('src', /^data:image\/svg\+xml;/ as unknown as string)
  await api.expect(afterImage).toHaveAttribute('alt', 'right.svg')
  await api.expect(afterImage).toHaveAttribute('src', /^data:image\/svg\+xml;/ as unknown as string)
}
