import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-ambiguous-selector'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `.button {
  color: red;
}

.button {
  color: blue;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `.button {
  color: red;
}

.button {
  color: blue;
  background: white;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/before.css<->${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .Inserted')

  await expect(beforePane).toContainText('.button')
  await expect(afterPane).toContainText('.button')
  await expect(afterPane).toContainText('background: white')
  // TODO
  // await expect(insertedRows).toHaveCount(1)
  // await expect(insertedRows).toHaveText('background: white;')
}
