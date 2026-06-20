import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-typescript'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.ts`, `const leftValue = 1`)
  await FileSystem.writeFile(`${tmpDir}/file-2.ts`, `const rightValue = 2`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.ts`, `${tmpDir}/file-2.ts`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  const expectedLocator0 = Locator('.DiffEditorContentLeft .Token.Keyword')
  await expect(expectedLocator0).toHaveCount(1)
  const expectedLocator1 = Locator('.DiffEditorContentRight .Token.Keyword')
  await expect(expectedLocator1).toHaveCount(1)
  const expectedLocator2 = Locator('.DiffEditorContentLeft .Token.Numeric')
  await expect(expectedLocator2).toHaveCount(1)
  const expectedLocator3 = Locator('.DiffEditorContentRight .Token.Numeric')
  await expect(expectedLocator3).toHaveCount(1)
  await expect(beforePane).toContainText('const leftValue = 1')
  await expect(afterPane).toContainText('const rightValue = 2')
  await expect(beforePane).not.toContainText('rightValue')
  await expect(afterPane).not.toContainText('leftValue')
}
