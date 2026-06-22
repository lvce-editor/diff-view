import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-insert-newline'
export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'gammaBeta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  // insert newline after 'gamma'
  await Command.execute('DiffView.handleInput', 'gamma')
  await Command.execute('DiffView.insertLineBreak')

  await expect(afterRows).toHaveText('gamma\nBeta')
}
