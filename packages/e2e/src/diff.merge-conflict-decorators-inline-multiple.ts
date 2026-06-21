import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.merge-conflict-decorators-inline-multiple'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = `before
<<<<<<< HEAD
first current
=======
first incoming
>>>>>>> first-branch
middle
<<<<<<< HEAD
second current
=======
second incoming
>>>>>>> second-branch
after`

  await FileSystem.writeFile(`${tmpDir}/before.txt`, content)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, content)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  const gitButtons = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.GitButtons')
  const incomingChanges = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.IncomingChange')

  await expect(gitButtons).toHaveCount(2)
  await expect(incomingChanges).toHaveCount(2)
  await expect(inlineRows).toContainText('first current')
  await expect(inlineRows).toContainText('first incoming')
  await expect(inlineRows).toContainText('second current')
  await expect(inlineRows).toContainText('second incoming')
}
