import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-final-line-deletion'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'shared one\nshared two\nold final')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'shared one\nshared two')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  await expect(deletedRows).toHaveCount(1)
  await expect(deletedRows).toHaveText('old final')
}
