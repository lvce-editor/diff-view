import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-soft-hyphen'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `cooperate`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `co\u00ADoperate`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('cooperate')
  await expect(afterPane).toContainText('cooperate')
  await expect(changedTokens).toHaveCount(2)
}
