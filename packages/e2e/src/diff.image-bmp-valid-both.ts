import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-bmp-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.bmp`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-bmp-valid-both.bmp`, 'fixture')

  await DiffView.open(`${tmpDir}/left.bmp`, `${tmpDir}/image-bmp-valid-both.bmp`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.bmp`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-bmp-valid-both.bmp`)
}
