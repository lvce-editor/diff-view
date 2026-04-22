import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-hair-space'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `alpha beta`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `alpha\u200Abeta`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  // const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toHaveText('alpha beta')
  await expect(afterPane).toHaveText('alpha\u200Abeta')
  // await expect(changedTokens).toHaveCount(2)
}
