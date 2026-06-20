import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-jpg-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.jpg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-jpg-valid-both.jpg`, 'fixture')

  await DiffView.open(`${tmpDir}/left.jpg`, `${tmpDir}/image-jpg-valid-both.jpg`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.jpg`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-jpg-valid-both.jpg`)
}
