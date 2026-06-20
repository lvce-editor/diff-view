import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inline-mode'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, `same
before
shared`)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, `same
after
shared`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineDiffEditor = Locator('.InlineDiffEditor')
  const inlineDiffEditorRows = Locator('.InlineDiffEditor .DiffEditorRows')
  const modeToggle = Locator('.DiffEditorModeToggle')

  await expect(inlineDiffEditor).toBeVisible()
  await expect(inlineDiffEditorRows).toContainText('- before')
  await expect(inlineDiffEditorRows).toContainText('+ after')
  await expect(modeToggle).toHaveText('Side by side')
}
