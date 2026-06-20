import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.switch-mode-button'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, `same
before
shared`)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, `same
after
shared`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const diffEditorHorizontal = Locator('.DiffEditorHorizontal')
  const inlineDiffEditor = Locator('.InlineDiffEditor')
  const inlineDiffEditorRows = Locator('.InlineDiffEditor .DiffEditorRows')
  const contentLeftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const modeToggle = Locator('.DiffEditorModeToggle')

  await expect(diffEditorHorizontal).toBeVisible()
  await expect(modeToggle).toHaveText('Inline')

  await Command.execute('DiffView.toggleDiffMode')

  await expect(inlineDiffEditor).toBeVisible()
  await expect(inlineDiffEditorRows).toContainText('- before')
  await expect(inlineDiffEditorRows).toContainText('+ after')
  await expect(modeToggle).toHaveText('Side by side')

  await Command.execute('DiffView.toggleDiffMode')

  await expect(diffEditorHorizontal).toBeVisible()
  await expect(contentLeftRows).toContainText('before')
  await expect(contentRightRows).toContainText('after')
  await expect(modeToggle).toHaveText('Inline')
}
