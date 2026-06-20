import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.unknown-extension-fallback'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.customext`,
    `plain before
shared`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.customext`,
    `plain after
shared`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.customext`, `${tmpDir}/after.customext`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const modeToggle = Locator('.DiffEditorModeToggle')
  await expect(leftRows).toContainText('plain before')
  await expect(rightRows).toContainText('plain after')
  await expect(modeToggle).toHaveText('Inline')
}
