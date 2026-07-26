import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-final-line-insertion'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'shared one\nshared two')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'shared one\nshared two\nnew final')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  await expect(insertedRows).toHaveCount(1)
  await expect(insertedRows).toHaveText('new final')
}
