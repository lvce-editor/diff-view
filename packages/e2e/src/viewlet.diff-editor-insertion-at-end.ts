import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion-at-end'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc\n`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')
  await expect(contentLeft).toHaveText('abc')
  await expect(contentRight).toHaveText('abc')

  const rowLeft = contentLeft.locator('.EditorRow')
  const rowRight = contentRight.locator('.EditorRow')
  await expect(rowLeft).toHaveCount(1)
  await expect(rowRight).toHaveCount(2)
  await expect(contentRight.locator('.EditorRow:nth-child(2)')).toHaveClass('Insertion')
}
