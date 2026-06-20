import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-and-identical-files'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/empty-before.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/empty-after.txt`, '')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/empty-before.txt`, `${tmpDir}/empty-after.txt`)

  const root = Locator('.DiffPrototype')
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')
  await expect(root).toBeVisible()
  await expect(leftRows).toHaveText('')
  await expect(rightRows).toHaveText('')

  await FileSystem.writeFile(
    `${tmpDir}/same-before.txt`,
    `same
content`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/same-after.txt`,
    `same
content`,
  )

  await DiffView.open(`${tmpDir}/same-before.txt`, `${tmpDir}/same-after.txt`)

  await expect(leftRows).toHaveText('samecontent')
  await expect(rightRows).toHaveText('samecontent')
  await expect(changedTokens).toHaveCount(0)

  await FileSystem.writeFile(`${tmpDir}/spaces-before.txt`, '   \n\t')
  await FileSystem.writeFile(`${tmpDir}/spaces-after.txt`, '   \n\t')

  await DiffView.open(`${tmpDir}/spaces-before.txt`, `${tmpDir}/spaces-after.txt`)

  await expect(leftRows).toBeVisible()
  await expect(rightRows).toBeVisible()
  await expect(changedTokens).toHaveCount(0)
}
