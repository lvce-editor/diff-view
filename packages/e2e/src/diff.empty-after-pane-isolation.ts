import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-after-pane-isolation'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane.locator('.DiffRow--deleted')).toHaveCount(1)
  await expect(afterRows).toHaveText('')
  await expect(afterPane.locator('.DiffRow--inserted')).toHaveCount(0)
}
