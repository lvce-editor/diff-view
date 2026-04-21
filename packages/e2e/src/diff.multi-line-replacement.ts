import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.multi-line-replacement'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `return oldValue\ncleanupOldValue()`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `return nextValue\ncleanupNextValue()`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft .DiffRow--deleted')
  const insertedRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(deletedRows).toHaveCount(2)
  await expect(insertedRows).toHaveCount(2)
  await expect(Locator('.DiffEditorContentLeft .DiffEditorRows')).toContainText('return oldValue')
  await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('return nextValue')
}
