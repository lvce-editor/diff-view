import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.multi-line-replacement'
export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `return oldValue\ncleanupOldValue()`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `return nextValue\ncleanupNextValue()`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft ..EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(deletedRows).toHaveCount(2)
  await expect(insertedRows).toHaveCount(2)
  const expectedLocator0 = Locator('.DiffEditorContentLeft .DiffEditorRows')
  await expect(expectedLocator0).toContainText('return oldValue')
  const expectedLocator1 = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(expectedLocator1).toContainText('return nextValue')
}
