import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-hyperscript'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.hyperscript`,
    `<button _="on click add .selected to me">Toggle</button>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.hyperscript`,
    `<button _="on click add .highlighted to me">Toggle</button>
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/left.hyperscript<->${tmpDir}/right.hyperscript`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('<button _="on click add .selected to me">Toggle</button>')
  await expect(contentRight).toContainText('<button _="on click add .highlighted to me">Toggle</button>')
}
