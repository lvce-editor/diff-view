import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-three-lines-added-light-theme'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
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
  await Command.execute('ColorTheme.setColorTheme', 'ayu')

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)

  const main = Locator('.Main')
  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(main).toHaveCSS('background-color', 'rgb(248, 249, 250)')
  await expect(beforePane).toContainText('.button')
  await expect(afterPane).toContainText('.button')
  await expect(afterPane).toContainText('color: red')
  await expect(afterPane).toContainText('display: flex')
  await expect(afterPane).toContainText('padding: 12px')
  await expect(insertedRows).toHaveCount(3)
  const expectedLocator0 = insertedRows.nth(0)
  await expect(expectedLocator0).toHaveText('  color: red;')
  const expectedLocator1 = insertedRows.nth(1)
  await expect(expectedLocator1).toHaveText('  display: flex;')
  const expectedLocator2 = insertedRows.nth(2)
  await expect(expectedLocator2).toHaveText('  padding: 12px;')
}
