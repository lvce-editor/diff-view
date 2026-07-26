import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-inline-identical-content'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'shared one\nshared two')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'shared one\nshared two')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  const changedRows = Locator('.InlineDiffEditor .EditorRow.Insertion, .InlineDiffEditor .EditorRow.Deletion')
  await expect(inlineRows).toContainText('shared one')
  await expect(inlineRows).toContainText('shared two')
  await expect(changedRows).toHaveCount(0)
}
