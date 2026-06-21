import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-webp-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.webp`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-webp-valid-both.webp`, 'fixture')

  await DiffView.open(`${tmpDir}/left.webp`, `${tmpDir}/image-webp-valid-both.webp`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')
  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await expect(beforeImage).toBeVisible()
  await expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/left.webp`)
  await expect(afterImage).toBeVisible()
  await expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-webp-valid-both.webp`)
}
