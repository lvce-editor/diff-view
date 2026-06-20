import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-invalid-both'

export const test: Test = async (api) => {
  const { DiffView, expect, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()

  await DiffView.open(`${tmpDir}/left-invalid.svg`, `${tmpDir}/image-invalid-both.svg`)

  const beforeError = Locator('.DiffEditorContentLeft .DiffEditorErrorMessage')
  const afterError = Locator('.DiffEditorContentRight .DiffEditorErrorMessage')

  await expect(beforeError).toBeVisible()
  await expect(afterError).toBeVisible()
}
