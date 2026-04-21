import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-line-added'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const longLine = 'very long added line '.repeat(80)

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, longLine)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const insertedRow = Locator('.DiffEditorContentRight .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(insertedRow).toBeVisible()
  await expect(insertedRow).toHaveText(longLine)
  await expect(afterRows).toHaveText(longLine)
}
