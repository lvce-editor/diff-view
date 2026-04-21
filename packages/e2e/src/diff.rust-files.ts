import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.rust-files'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.rs`,
    `pub fn greet() {
    let message = "hello";
    println!("{}", message);
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.rs`,
    `pub fn greet() {
    let message = "hello, world";
    println!("{}", message);
}
`,
  )

  await Workspace.setPath(tmpDir)
  await Main.openUri(`diff://${tmpDir}/left.rs<->${tmpDir}/right.rs`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText('pub fn greet() {')
  await expect(beforePane).toContainText('let message = "hello";')
  await expect(afterPane).toContainText('pub fn greet() {')
  await expect(afterPane).toContainText('let message = "hello, world";')
  await expect(beforePane.locator('.Token.Keyword')).toHaveCount(3)
  await expect(afterPane.locator('.Token.Keyword')).toHaveCount(3)
}
