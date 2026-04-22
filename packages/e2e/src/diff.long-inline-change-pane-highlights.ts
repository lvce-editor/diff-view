import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change-pane-highlights'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `function loadUserProfileSummary() {}`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `function loadUserProfileCard() {}`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(Locator('.DiffEditorContentLeft .DiffToken--changed')).toHaveCount(2)
  await expect(Locator('.DiffEditorContentRight .DiffToken--changed')).toHaveCount(2)
  await expect(beforePane).not.toContainText('loadUserProfileCard')
  await expect(afterPane).not.toContainText('loadUserProfileSummary')
}
