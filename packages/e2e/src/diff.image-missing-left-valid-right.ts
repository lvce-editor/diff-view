import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-missing-left-valid-right'

export const test: Test = async (api) => {
  const { DiffView, expect, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/image-missing-left-valid-right.svg`, 'fixture')

  await DiffView.open(`${tmpDir}/missing-left.svg`, `${tmpDir}/image-missing-left-valid-right.svg`)

  const beforeError = Locator('.DiffEditorContentLeft .DiffEditorErrorMessage')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeError).toBeVisible()
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-missing-left-valid-right.svg`)
}
