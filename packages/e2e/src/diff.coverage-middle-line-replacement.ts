import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-middle-line-replacement'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'shared one\nbefore middle\nshared two')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'shared one\nafter middle\nshared two')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  await expect(deletedRows).toHaveText('before middle')
  await expect(insertedRows).toHaveText('after middle')
}
