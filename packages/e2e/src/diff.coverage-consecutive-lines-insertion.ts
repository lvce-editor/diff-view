import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-consecutive-lines-insertion'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'start\nend')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'start\nadded one\nadded two\nend')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  const secondInsertedRow = insertedRows.nth(1)
  await expect(insertedRows).toHaveCount(2)
  await expect(insertedRows.first()).toHaveText('added one')
  await expect(secondInsertedRow).toHaveText('added two')
}
