import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.side-by-side-mode'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, `same
before
shared`)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, `same
after
shared`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  await expect(Locator('.DiffEditorHorizontal')).toBeVisible()
  await expect(Locator('.DiffEditorContentLeft .DiffEditorRows')).toContainText('before')
  await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('after')
  await expect(Locator('.DiffEditorModeToggle')).toHaveText('Inline')
}
