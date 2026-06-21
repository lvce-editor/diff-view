import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-png-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-png-valid-both.png`, 'fixture')

  await DiffView.open(`${tmpDir}/left.png`, `${tmpDir}/image-png-valid-both.png`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.png`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-png-valid-both.png`)
}
