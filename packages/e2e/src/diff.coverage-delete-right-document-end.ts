import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-delete-right-document-end'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 4, 1)
  await Command.execute('DiffView.deleteRight')

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(afterRows).toHaveText('alphabeta')
}
