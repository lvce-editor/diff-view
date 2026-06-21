import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-gif-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.gif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-gif-valid-both.gif`, 'fixture')

  await DiffView.open(`${tmpDir}/left.gif`, `${tmpDir}/image-gif-valid-both.gif`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.gif`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-gif-valid-both.gif`)
}
