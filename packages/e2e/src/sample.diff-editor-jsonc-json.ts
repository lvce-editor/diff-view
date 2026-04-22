import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-jsonc-json'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
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
  // right side comment
  "name": "right",
  "enabled": false,
  "count": 2
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/settings.jsonc`, `${tmpDir}/settings.json`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('// left side comment')
  await expect(contentLeft).toContainText('"name": "left"')
  await expect(contentRight).toContainText('"name": "right"')
  await expect(contentRight).toContainText('"count": 2')
}
