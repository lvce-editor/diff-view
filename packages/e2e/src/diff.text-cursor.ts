import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.text-cursor'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeLineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber').first()
  const sash = Locator('.SashVertical').first()

  await expect(beforeRows).toHaveCSS('cursor', 'text')
  await expect(afterRows).toHaveCSS('cursor', 'text')
  await expect(beforeLineNumber).toHaveCSS('cursor', 'auto')
  await expect(sash).toHaveCSS('cursor', 'col-resize')
}
