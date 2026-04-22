import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-three-lines-deleted-two-modified'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
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

  await Main.openUri(`diff://${tmpDir}/before.css<->${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeRows = beforePane.locator('.EditorRow')
  const afterRows = afterPane.locator('.EditorRow')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  const changedTokensBefore = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const changedTokensAfter = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(beforePane).toContainText('color: red')
  await expect(beforePane).toContainText('background: white')
  await expect(beforePane).toContainText('border: 1px solid red')
  await expect(beforePane).toContainText('margin: 8px')
  await expect(beforePane).toContainText('padding: 12px')
  await expect(afterPane).toContainText('color: blue')
  await expect(afterPane).toContainText('background: black')
  await expect(deletedRows).toHaveCount(5)
  await expect(insertedRows).toHaveCount(2)
  await expect(beforeRows.nth(1)).toHaveText('color: red;')
  await expect(beforeRows.nth(1)).toHaveClass('Deletion')
  await expect(afterRows.nth(1)).toHaveText('color: blue;')
  await expect(afterRows.nth(1)).toHaveClass('Insertion')
  await expect(beforeRows.nth(2)).toHaveText('background: white;')
  await expect(beforeRows.nth(2)).toHaveClass('Deletion')
  await expect(afterRows.nth(2)).toHaveText('background: black;')
  await expect(afterRows.nth(2)).toHaveClass('Insertion')
  await expect(beforeRows.nth(4)).toHaveText('border: 1px solid red;')
  await expect(beforeRows.nth(4)).toHaveClass('Deletion')
  await expect(afterRows.nth(4)).toHaveText('')
  await expect(beforeRows.nth(5)).toHaveText('margin: 8px;')
  await expect(beforeRows.nth(5)).toHaveClass('Deletion')
  await expect(afterRows.nth(5)).toHaveText('')
  await expect(beforeRows.nth(6)).toHaveText('padding: 12px;')
  await expect(beforeRows.nth(6)).toHaveClass('Deletion')
  await expect(afterRows.nth(6)).toHaveText('')
  await expect(changedTokensBefore).toHaveCount(2)
  await expect(changedTokensAfter).toHaveCount(2)
}
