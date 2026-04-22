import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-word-joiner'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `resume`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `re\u2060sume`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('resume')
  await expect(afterPane).toContainText('re0sume')
  await expect(changedTokens).toHaveCount(2)
}
