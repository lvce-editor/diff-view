import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inner-word-highlight'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const message = 'hello world'`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const message = 'hello diffs'`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeChangedTokens = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const afterChangedTokens = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(beforePane).toContainText(`const message = 'hello world'`)
  await expect(afterPane).toContainText(`const message = 'hello diffs'`)
  await expect(beforeChangedTokens).toHaveCount(1)
  await expect(afterChangedTokens).toHaveCount(1)
  await expect(beforeChangedTokens.first()).toHaveText('world')
  await expect(afterChangedTokens.first()).toHaveText('diffs')
}
