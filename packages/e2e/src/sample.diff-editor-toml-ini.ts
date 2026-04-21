import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-toml-ini'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/Cargo.toml`,
    `[package]
name = "left"
version = "0.1.0"

[dependencies]
serde = "1"
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/app.ini`,
    `[package]
name = right
version = 2

[dependencies]
serde = yes
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/Cargo.toml<->${tmpDir}/app.ini`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('name = "left"')
  await expect(contentLeft).toContainText('serde = "1"')
  await expect(contentRight).toContainText('name = right')
  await expect(contentRight).toContainText('serde = yes')
}
