import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.switch-mode-button'

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

  const modeToggle = Locator('.DiffEditorModeToggle')
  await expect(Locator('.DiffEditorHorizontal')).toBeVisible()
  await expect(modeToggle).toHaveText('Inline')

  await modeToggle.click()

  await expect(Locator('.InlineDiffEditor')).toBeVisible()
  await expect(Locator('.InlineDiffEditor .DiffEditorRows')).toContainText('- before')
  await expect(Locator('.InlineDiffEditor .DiffEditorRows')).toContainText('+ after')
  await expect(modeToggle).toHaveText('Side by side')

  await modeToggle.click()

  await expect(Locator('.DiffEditorHorizontal')).toBeVisible()
  await expect(Locator('.DiffEditorContentLeft .DiffEditorRows')).toContainText('before')
  await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('after')
  await expect(modeToggle).toHaveText('Inline')
}
