import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.partial-emoji-skin-tone'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `reaction: 👍🏻`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `reaction: 👍🏿`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeDeletion = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const afterInsertion = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText('reaction: 👍🏻')
  await expect(afterPane).toContainText('reaction: 👍🏿')
  await expect(beforeDeletion.first()).toBeVisible()
  await expect(afterInsertion.first()).toBeVisible()
}
