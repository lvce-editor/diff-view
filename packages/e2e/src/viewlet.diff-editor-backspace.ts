import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-backspace'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'gamma beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  // simulate existing input buffer "gamma " and backspace
  await Command.execute('DiffView.handleInput', 'gamma ')
  await Command.execute('DiffView.deleteLeft')

  await expect(afterRows).toHaveText('gammabeta')
}
