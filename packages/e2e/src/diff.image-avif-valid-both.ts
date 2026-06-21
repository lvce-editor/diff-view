import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-avif-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.avif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-avif-valid-both.avif`, 'fixture')

  await DiffView.open(`${tmpDir}/left.avif`, `${tmpDir}/image-avif-valid-both.avif`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.avif`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-avif-valid-both.avif`)
}
