import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-javascript'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.js`, `const leftValue = 1`)
  await FileSystem.writeFile(`${tmpDir}/file-2.js`, `const rightValue = 2`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.js`, `${tmpDir}/file-2.js`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toHaveText('const leftValue = 1')
  await expect(contentRight).toHaveText('const rightValue = 2')
  // const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  // const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  // const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  // const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')
  // await expect(keywordTokensLeft).toHaveCount(1)
  // await expect(keywordTokensRight).toHaveCount(1)
  // await expect(numericTokensLeft).toHaveCount(1)
  // await expect(numericTokensRight).toHaveCount(1)
}
