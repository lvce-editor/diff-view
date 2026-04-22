import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.many-lines-deleted'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const deletedLines = Array.from({ length: 30 }, (_, index) => `deleted line ${index + 1}`)

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, deletedLines.join('\n'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft .DiffRow--deleted')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(deletedRows).toHaveCount(30)
  await expect(deletedRows).toContainText('deleted line 1')
  await expect(deletedRows).toContainText('deleted line 30')
  await expect(afterRows).toHaveText('')
}
