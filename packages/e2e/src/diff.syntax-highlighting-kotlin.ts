import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-kotlin'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.kt`,
    `fun greet() {
  val count = 1
  println(count)
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.kt`,
    `fun greet() {
  val count = 2
  println(count)
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.kt`, `${tmpDir}/right.kt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')

  await expect(beforePane).toContainText('fun greet() {')
  await expect(afterPane).toContainText('fun greet() {')
  await expect(beforePane).toContainText('val count = 1')
  await expect(afterPane).toContainText('val count = 2')
  await expect(keywordTokensLeft).toHaveCount(1)
  await expect(keywordTokensRight).toHaveCount(1)
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
}
