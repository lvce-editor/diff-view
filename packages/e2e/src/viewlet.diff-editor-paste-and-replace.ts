import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-paste-and-replace'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'one\ntwo\nthree')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'one\ntwo\nthree')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  // simulate paste replacing 'two' with '2'
  // set input to full content with replacement
  await Command.execute('DiffView.handleInput', 'one\n2\nthree')

  await expect(afterRows).toHaveText('one\n2\nthree')
}
