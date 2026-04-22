import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-pug'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.pug`,
    `doctype html
html
  body
    h1 Hello
    p Left
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.pug`,
    `doctype html
html
  body
    h1 Hello
    p Right
    ul
      li Item 1
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/left.pug<->${tmpDir}/right.pug`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('h1 Hello')
  await expect(contentLeft).toContainText('p Left')
  await expect(contentRight).toContainText('p Right')
  await expect(contentRight).toContainText('li Item 1')
}
