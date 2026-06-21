import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.sql-comment-deletion'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.sql`,
    `-- This is a test sql file
-- This is an sql comment

CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.sql`,
    `-- This is a test sql file

CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.sql`, `${tmpDir}/after.sql`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText('-- This is an sql comment')
  await expect(afterRows).toContainText('CREATE TABLE users')
  await expect(deletedRows).toHaveCount(1)
  await expect(deletedRows.first()).toHaveText('-- This is an sql comment')
  await expect(insertedRows).toHaveCount(0)
}
