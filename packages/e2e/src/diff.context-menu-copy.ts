import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.context-menu-copy'

export const skip = 1

export const test: Test = async ({ Command, ContextMenu, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const value = before`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const value = after`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  await Command.execute('DiffView.handleContextMenu', 2, 10, 20)
  await ContextMenu.selectItem('Copy')

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(beforePane).toContainText('const value = before')
  await expect(afterPane).toContainText('const value = after')
}
