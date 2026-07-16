import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.delete-right-character'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'pear world')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'pear world')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await Command.execute('DiffView.setCursorPosition', 1, 0)
  await Command.execute('DiffView.deleteRight')

  await expect(afterRows).toHaveText('par world')
}
