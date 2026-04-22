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
  const deletedRows = Locator('.DiffEditorContentLeft .DiffRow--deleted')
  const insertedRows = Locator('.DiffEditorContentRight .DiffRow--inserted')
  const changedTokensBefore = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const changedTokensAfter = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(beforePane).toContainText('color: red')
  await expect(beforePane).toContainText('background: white')
  await expect(beforePane).toContainText('border: 1px solid red')
  await expect(beforePane).toContainText('margin: 8px')
  await expect(beforePane).toContainText('padding: 12px')
  await expect(afterPane).toContainText('color: blue')
  await expect(afterPane).toContainText('background: black')
  await expect(deletedRows).toHaveCount(3)
  await expect(insertedRows).toHaveCount(2)
  await expect(deletedRows.nth(0)).toHaveText('border: 1px solid red;')
  await expect(deletedRows.nth(1)).toHaveText('margin: 8px;')
  await expect(deletedRows.nth(2)).toHaveText('padding: 12px;')
  await expect(insertedRows.nth(0)).toHaveText('color: blue;')
  await expect(insertedRows.nth(1)).toHaveText('background: black;')
  await expect(changedTokensBefore).toHaveCount(2)
  await expect(changedTokensAfter).toHaveCount(2)
}
