import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.edit-right-side'

export const skip = 1
export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const afterRow = afterRows.locator('.EditorRow').first()
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  await Command.execute('DiffView.handleInput', 'gamma ')

  await expect(input).toHaveValue('gamma ')
  await expect(afterRows).toHaveText('gamma beta')
  await expect(afterRow).toHaveClass('EditorRow Insertion')
}
