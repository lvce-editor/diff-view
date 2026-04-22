import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const root = Locator('.DiffPrototype')
  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const insertedRow = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(root).toBeVisible()
  await expect(beforeRows).toHaveText('')
  await expect(insertedRow).toBeVisible()
  await expect(insertedRow).toContainText('abc')
}
