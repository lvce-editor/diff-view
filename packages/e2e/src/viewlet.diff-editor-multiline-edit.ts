import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-multiline-edit'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'line1\nline2\nline3')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'line1\nline2\nline3')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  // insert text in the middle line
  await Command.execute('DiffView.handleInput', 'line1\nmid-line\nline3')

  await expect(afterRows).toHaveText('line1\nmid-line\nline3')
}
