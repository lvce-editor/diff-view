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

  await expect(beforePane).toContainText('fun greet() {')
  await expect(afterPane).toContainText('fun greet() {')
  await expect(beforePane).toContainText('val count = 1')
  await expect(afterPane).toContainText('val count = 2')
  await expect(Locator('.DiffEditorContentLeft .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentLeft .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Numeric')).toHaveCount(1)
}
