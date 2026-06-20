import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.open-second-diff-clears-old-content'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before-a.txt`, 'old before')
  await FileSystem.writeFile(`${tmpDir}/after-a.txt`, 'old after')
  await FileSystem.writeFile(`${tmpDir}/before-b.txt`, 'new before')
  await FileSystem.writeFile(`${tmpDir}/after-b.txt`, 'new after')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before-a.txt`, `${tmpDir}/after-a.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toContainText('old before')
  await expect(rightRows).toContainText('old after')

  await DiffView.open(`${tmpDir}/before-b.txt`, `${tmpDir}/after-b.txt`)

  await expect(leftRows).toContainText('new before')
  await expect(rightRows).toContainText('new after')
  await expect(leftRows).toHaveText('new before')
  await expect(rightRows).toHaveText('new after')
}
