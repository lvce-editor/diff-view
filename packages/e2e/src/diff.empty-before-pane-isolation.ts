import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before-pane-isolation'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')

  await expect(beforeRows).toHaveText('')
  await expect(beforePane.locator('..EditorRow.Deletion')).toHaveCount(0)
  await expect(afterPane.locator('.DiffRow.Insertion')).toHaveCount(1)
}
