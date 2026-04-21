import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-sql'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/query-before.sql`,
    `SELECT id, name
FROM users
WHERE id = 1;
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/query-after.sql`,
    `SELECT id, name
FROM users
WHERE id = 2;
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/query-before.sql<->${tmpDir}/query-after.sql`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')

  await expect(contentLeft).toContainText('WHERE id = 1;')
  await expect(contentRight).toContainText('WHERE id = 2;')
  await expect(keywordTokensLeft).toHaveCount(3)
  await expect(keywordTokensRight).toHaveCount(3)
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
}
