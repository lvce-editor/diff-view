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

  await expect(Locator('.InlineDiffEditor')).toBeVisible()
  await expect(Locator('.InlineDiffEditor .DiffEditorRows')).toContainText('- before')
  await expect(Locator('.InlineDiffEditor .DiffEditorRows')).toContainText('+ after')
  await expect(Locator('.DiffEditorModeToggle')).toHaveText('Side by side')
}
