import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-separated-line-insertions'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'one\ntwo\nthree')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'added first\none\ntwo\nadded second\nthree')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  const secondInsertedRow = insertedRows.nth(1)
  await expect(insertedRows).toHaveCount(2)
  await expect(insertedRows.first()).toHaveText('added first')
  await expect(secondInsertedRow).toHaveText('added second')
}
