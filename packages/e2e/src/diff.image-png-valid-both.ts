import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-png-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-png-valid-both.png`, 'fixture')

  await DiffView.open(`${tmpDir}/left.png`, `${tmpDir}/image-png-valid-both.png`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.png`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-png-valid-both.png`)
}
