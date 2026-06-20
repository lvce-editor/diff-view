import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-valid-left-invalid-right'

export const test: Test = async (api) => {
  const { DiffView, expect, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-valid.svg`, 'fixture')

  await DiffView.open(`${tmpDir}/left-valid.svg`, `${tmpDir}/image-valid-left-invalid-right.svg`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterError = Locator('.DiffEditorContentRight .DiffEditorErrorMessage')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left-valid.svg`)
  await expect(afterError).toBeVisible()
}
