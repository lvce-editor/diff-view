import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion-whitespace'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc `)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')
  const rowLeft = contentLeft.locator('.EditorRow')
  const rowRight = contentRight.locator('.EditorRow')

  await expect(contentLeft).toHaveJSProperty('textContent', 'abc')
  await expect(contentRight).toHaveJSProperty('textContent', 'abc ')
  await expect(rowLeft).toHaveClass('Deletion')
  await expect(rowRight).toHaveClass('Insertion')
}
