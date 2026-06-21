import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-svg-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.svg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-svg-valid-both.svg`, 'fixture')

  await DiffView.open(`${tmpDir}/left.svg`, `${tmpDir}/image-svg-valid-both.svg`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.svg`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-svg-valid-both.svg`)
}
