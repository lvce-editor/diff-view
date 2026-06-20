import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.edit-right-side'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await Command.execute('DiffView.handleClickAt', 10_000, 0, '')

  const input = Locator('.DiffEditorInput')
  await expect(input).toBeFocused()

  await input.type('gamma ')

  await expect(afterRows).toHaveText('gamma beta')
  await expect(afterRows.locator('.EditorRow').first()).toHaveClass('EditorRow Insertion')
}
