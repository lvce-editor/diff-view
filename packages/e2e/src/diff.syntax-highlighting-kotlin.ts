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
  const expectedLocator0 = Locator('.DiffEditorContentLeft .Token.Keyword')
  await expect(expectedLocator0).toHaveCount(1)
  const expectedLocator1 = Locator('.DiffEditorContentRight .Token.Keyword')
  await expect(expectedLocator1).toHaveCount(1)
  const expectedLocator2 = Locator('.DiffEditorContentLeft .Token.Numeric')
  await expect(expectedLocator2).toHaveCount(1)
  const expectedLocator3 = Locator('.DiffEditorContentRight .Token.Numeric')
  await expect(expectedLocator3).toHaveCount(1)
}
