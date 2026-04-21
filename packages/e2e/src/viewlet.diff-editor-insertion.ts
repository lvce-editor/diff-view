import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `def`)
  await Workspace.setPath(tmpDir)

  // act
  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  // assert
  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(contentLeft).toHaveText('')
  await expect(contentRight).toHaveText('def')
  const rowLeft = contentLeft.locator('.EditorRow').nth(0)
  await expect(rowLeft).toHaveClass('Deletion')
  const rowRight = contentRight.locator('.EditorRow').nth(1) // TODO
  await expect(rowRight).toHaveClass('Insertion')
}
