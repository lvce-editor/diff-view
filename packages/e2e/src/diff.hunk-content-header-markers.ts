import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.hunk-content-header-markers'


export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, '-- old marker')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, '++ new marker')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText('-- old marker')
  await expect(afterRows).toContainText('++ new marker')
  await expect(deletedRows).toHaveCount(1)
  await expect(insertedRows).toHaveCount(1)
}
