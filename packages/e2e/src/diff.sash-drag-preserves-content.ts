import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.sash-drag-preserves-content'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'const value = before')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'const value = after')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const verticalSash = Locator('.SashVertical')
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await Command.execute('DiffView.handleSashPointerDown', 170, 0)
  await Command.execute('DiffView.handleSashPointerMove', 230, 0)
  await Command.execute('DiffView.handleSashPointerUp', 230, 0)

  await expect(verticalSash).toBeVisible()
  await expect(leftRows).toContainText('const value = before')
  await expect(rightRows).toContainText('const value = after')

  await Command.execute('DiffView.handleSashPointerDown', 230, 0)
  await Command.execute('DiffView.handleSashPointerMove', 30, 0)
  await Command.execute('DiffView.handleSashPointerUp', 30, 0)

  await expect(leftRows).toContainText('const value = before')
  await expect(rightRows).toContainText('const value = after')
}
