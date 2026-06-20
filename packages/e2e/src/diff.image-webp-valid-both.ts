import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-webp-valid-both'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.webp`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-webp-valid-both.webp`, 'fixture')

  await DiffView.open(`${tmpDir}/left.webp`, `${tmpDir}/image-webp-valid-both.webp`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.webp`)
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-webp-valid-both.webp`)
}
