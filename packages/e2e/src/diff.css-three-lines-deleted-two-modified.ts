import type { Test } from '@lvce-editor/test-with-playwright'

const expectRowsToHaveText = async (expect: any, rows: any, texts: readonly string[]): Promise<void> => {
  for (let index = 0; index < texts.length; index += 1) {
    const row = rows.nth(index)
    await expect(row).toHaveText(texts[index])
  }
}

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
  await expectRowsToHaveText(expect, deletedRows, ['  color: red;', '  background: white;', '  border: 1px solid red;', '  margin: 8px;', '  padding: 12px;'])
  await expectRowsToHaveText(expect, insertedRows, ['  color: blue;', '  background: black;'])
}
