import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-typing-at-cursor'
export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'hello')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'helloWorld')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  await DiffView.handleClickAt(100_000, 0, 'DiffEditorRows')
  await expect(input).toBeFocused()
  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '139px')
  await input.type(' abc')

  await expect(input).toHaveValue(' abc')
  await expect(afterRows).toHaveText('helloWorld abc')
  await expect(cursor).toHaveCSS('left', '175px')
}
