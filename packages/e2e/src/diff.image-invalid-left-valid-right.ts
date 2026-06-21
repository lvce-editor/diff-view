import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-invalid-left-valid-right'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/image-invalid-left-valid-right.svg`, 'fixture')

  await DiffView.open(`${tmpDir}/left-invalid.svg`, `${tmpDir}/image-invalid-left-valid-right.svg`)

  const beforeError = Locator('.DiffEditorContentLeft .DiffEditorErrorMessage')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeError).toBeVisible()
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-invalid-left-valid-right.svg`)
}
