import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-nix'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/flake-before.nix`,
    `{
  description = "left";
  outputs = { };
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/flake-after.nix`,
    `{
  description = "right";
  outputs = { };
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/flake-before.nix<->${tmpDir}/flake-after.nix`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('description = "left";')
  await expect(contentRight).toContainText('description = "right";')
}
