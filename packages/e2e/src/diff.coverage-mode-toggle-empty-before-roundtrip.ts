import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-mode-toggle-empty-before-roundtrip'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'added')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.toggleDiffMode')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineRows).toContainText('+ added')

  await Command.execute('DiffView.toggleDiffMode')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(rightRows).toHaveText('added')
}
