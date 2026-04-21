import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.large-text-file'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/before.txt<->${tmpDir}/after.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .DiffRow--inserted')

  // TODO verify helpful error is displayed
  await expect(beforePane).toContainText('"id": 1,')
  await expect(afterPane).toContainText('"id": 2,')
  await expect(afterPane).toContainText('"name": "bravo"')
  await expect(insertedRows).toHaveCount(7)
  await expect(insertedRows.nth(0)).toHaveText('{')
  await expect(insertedRows.nth(1)).toHaveText('"id": 2,')
  await expect(insertedRows.nth(2)).toHaveText('"name": "bravo",')
  await expect(insertedRows.nth(3)).toHaveText('"meta": {')
  await expect(insertedRows.nth(4)).toHaveText('"enabled": false')
  await expect(insertedRows.nth(5)).toHaveText('}')
  await expect(insertedRows.nth(6)).toHaveText('}')
}
