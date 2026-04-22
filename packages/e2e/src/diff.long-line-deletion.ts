import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-line-deletion'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const longLine = 'very long deleted line '.repeat(80)

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, longLine)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const deletedRow = Locator('.DiffEditorContentLeft .DiffRow--deleted')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(deletedRow).toBeVisible()
  await expect(deletedRow).toHaveText(longLine)
  await expect(afterRows).toHaveText('')
}
