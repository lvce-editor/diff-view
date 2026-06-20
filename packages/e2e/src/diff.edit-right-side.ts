import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.edit-right-side'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  await input.type('gamma ')
  await input.dispatchEvent('input', '{}')

  await expect(input).toHaveValue('gamma ')
  await expect(afterRows).toHaveText('gamma beta')
  await expect(afterRows.locator('.EditorRow').first()).toHaveClass('EditorRow Insertion')
}
