import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.one-char-change-pane-highlights'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const value = cat`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const value = cut`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokensLeft = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const changedTokensRight = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(changedTokensLeft).toHaveCount(1)
  await expect(changedTokensRight).toHaveCount(1)
  await expect(beforePane).not.toContainText('const value = cut')
  await expect(afterPane).not.toContainText('const value = cat')
}
