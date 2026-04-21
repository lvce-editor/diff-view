import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-jsonc-json'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/settings.jsonc`,
    `{
  // left side comment
  "name": "left",
  "enabled": true,
  "count": 1,
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/settings.json`,
    `{
  "name": "right",
  "enabled": false,
  "count": 2
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/settings.jsonc<->${tmpDir}/settings.json`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('// left side comment')
  await expect(contentLeft).toContainText('"name": "left"')
  await expect(contentRight).toContainText('"name": "right"')
  await expect(contentRight).toContainText('"count": 2')
}
