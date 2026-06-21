import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-ico-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.ico`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-ico-valid-both.ico`, 'fixture')

  await DiffView.open(`${tmpDir}/left.ico`, `${tmpDir}/image-ico-valid-both.ico`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.ico`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-ico-valid-both.ico`)
}
