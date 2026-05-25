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
  const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')

  await expect(keywordTokensLeft).toHaveCount(1)
  await expect(keywordTokensRight).toHaveCount(1)
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
  await expect(beforePane).toContainText('const leftValue = 1')
  await expect(afterPane).toContainText('const rightValue = 2')
  await expect(beforePane).not.toContainText('rightValue')
  await expect(afterPane).not.toContainText('leftValue')
}
