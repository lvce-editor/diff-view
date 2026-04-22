import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion-whitespace'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc `)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const rowLeft = contentLeft.locator('.EditorRow').nth(0)
  const rowRight = contentRight.locator('.EditorRow').nth(1) // TODO

  await expect(contentLeft).toHaveText('abc')
  await expect(contentRight).toHaveText('abc ')
  await expect(rowLeft).toHaveClass('Deletion')
  await expect(rowRight).toHaveClass('Insertion')
}
