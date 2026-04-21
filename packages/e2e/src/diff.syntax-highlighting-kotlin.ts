import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-kotlin'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
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

  await Main.openUri(`diff://${tmpDir}/left.kt<->${tmpDir}/right.kt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText('fun greet() {')
  await expect(afterPane).toContainText('fun greet() {')
  await expect(beforePane).toContainText('val count = 1')
  await expect(afterPane).toContainText('val count = 2')
  await expect(Locator('.DiffPane--before .Token.Keyword')).toHaveCount(2)
  await expect(Locator('.DiffPane--after .Token.Keyword')).toHaveCount(2)
  await expect(Locator('.DiffPane--before .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffPane--after .Token.Numeric')).toHaveCount(1)
  await expect(beforePane).not.toContainText('count = 2')
  await expect(afterPane).not.toContainText('count = 1')
}
