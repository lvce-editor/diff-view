import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-three-lines-deleted-two-modified'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `.button {
  color: red;
  background: white;
  display: flex;
  border: 1px solid red;
  margin: 8px;
  padding: 12px;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `.button {
  color: blue;
  background: black;
  display: flex;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText('color: red')
  await expect(beforePane).toContainText('background: white')
  await expect(beforePane).toContainText('border: 1px solid red')
  await expect(beforePane).toContainText('margin: 8px')
  await expect(beforePane).toContainText('padding: 12px')
  await expect(afterPane).toContainText('color: blue')
  await expect(afterPane).toContainText('background: black')
  await expect(deletedRows).toHaveCount(5)
  await expect(insertedRows).toHaveCount(2)
  const expectedLocator0 = deletedRows.nth(0)
  await expect(expectedLocator0).toHaveText('  color: red;')
  const expectedLocator1 = deletedRows.nth(1)
  await expect(expectedLocator1).toHaveText('  background: white;')
  const expectedLocator2 = deletedRows.nth(2)
  await expect(expectedLocator2).toHaveText('  border: 1px solid red;')
  const expectedLocator3 = deletedRows.nth(3)
  await expect(expectedLocator3).toHaveText('  margin: 8px;')
  const expectedLocator4 = deletedRows.nth(4)
  await expect(expectedLocator4).toHaveText('  padding: 12px;')
  const expectedLocator5 = insertedRows.nth(0)
  await expect(expectedLocator5).toHaveText('  color: blue;')
  const expectedLocator6 = insertedRows.nth(1)
  await expect(expectedLocator6).toHaveText('  background: black;')
}
