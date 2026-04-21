import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.mixed-chunks'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const legacyHeader = true\nrenderLegacySidebar()`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const heroBanner = true\nrenderFreshSidebar()`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .DiffRow--deleted')

  await expect(insertedRows).toHaveCount(2)
  await expect(deletedRows).toHaveCount(2)
  await expect(beforePane).toContainText('legacyHeader')
  await expect(afterPane).toContainText('heroBanner')
}
