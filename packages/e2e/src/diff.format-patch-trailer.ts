import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.format-patch-trailer'


export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `line one
line three`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `line one
line two
line three`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText('line one')
  await expect(beforeRows).toContainText('line three')
  await expect(afterRows).toContainText('line two')
  await expect(deletedRows).toHaveCount(0)
  await expect(insertedRows).toHaveCount(1)
}
