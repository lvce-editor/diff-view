import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-three-lines-added'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `.button {
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `.button {
  color: red;
  display: flex;
  padding: 12px;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/before.css<->${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .DiffRow--inserted')

  await expect(beforePane).toContainText('.button')
  await expect(beforePane).not.toContainText('color: red')
  await expect(afterPane).toContainText('.button')
  await expect(afterPane).toContainText('color: red')
  await expect(afterPane).toContainText('display: flex')
  await expect(afterPane).toContainText('padding: 12px')
  await expect(insertedRows).toHaveCount(3)
  await expect(insertedRows.nth(0)).toHaveText('color: red;')
  await expect(insertedRows.nth(1)).toHaveText('display: flex;')
  await expect(insertedRows.nth(2)).toHaveText('padding: 12px;')
}
