import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-ico-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.ico`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-ico-valid-both.ico`, 'fixture')

  await DiffView.open(`${tmpDir}/left.ico`, `${tmpDir}/image-ico-valid-both.ico`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.ico`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-ico-valid-both.ico`)
}
