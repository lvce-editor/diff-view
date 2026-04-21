import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const root = Locator('.DiffPrototype')
  const beforeRows = Locator('.DiffPane--before .DiffEditorRows')
  const insertedRow = Locator('.DiffPane--after .DiffRow--inserted')

  await expect(root).toBeVisible()
  await expect(beforeRows).toHaveText('')
  await expect(insertedRow).toBeVisible()
  await expect(insertedRow).toContainText('abc')
}
