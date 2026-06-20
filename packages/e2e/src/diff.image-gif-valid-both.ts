import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-gif-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.gif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-gif-valid-both.gif`, 'fixture')

  await DiffView.open(`${tmpDir}/left.gif`, `${tmpDir}/image-gif-valid-both.gif`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.gif`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-gif-valid-both.gif`)
}
