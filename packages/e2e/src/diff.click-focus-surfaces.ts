import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.click-focus-surfaces'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')
  const firstLineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber').first()
  const verticalSash = Locator('.SashVertical').first()
  const inlineEditor = Locator('.InlineDiffEditor')

  await Command.execute('DiffView.handleClickLeftSide')
  await expect(leftRows).toContainText('alpha')

  await Command.execute('DiffView.handleClickRightSide')
  await expect(input).toBeFocused()
  await expect(rightRows).toContainText('beta')

  await Command.execute('DiffView.handleClickLeftSide')
  await expect(firstLineNumber).toBeVisible()
  await expect(leftRows).toContainText('alpha')

  await Command.execute('DiffView.handleSashPointerDown', 170, 0)
  await Command.execute('DiffView.handleSashPointerUp', 170, 0)
  await expect(verticalSash).toHaveCSS('cursor', 'col-resize')

  await Command.execute('DiffView.toggleDiffMode')
  await expect(inlineEditor).toBeVisible()
}
