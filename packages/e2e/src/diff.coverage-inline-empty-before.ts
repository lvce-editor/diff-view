import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-inline-empty-before'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'added')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineRows).toContainText('+ added')
}
