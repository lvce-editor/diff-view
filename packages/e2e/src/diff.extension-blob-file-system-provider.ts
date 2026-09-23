import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.extension-blob-file-system-provider'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await DiffView.open('data://before content', 'blob-fixture:///workspace/file.txt')

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(leftRows).toHaveText('before content')
  await expect(rightRows).toHaveText('remote 😀 content')
}
