import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-mode-toggle-empty-after-roundtrip'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'removed')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, '')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.toggleDiffMode')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineRows).toContainText('- removed')

  await Command.execute('DiffView.toggleDiffMode')
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  await expect(leftRows).toHaveText('removed')
}
