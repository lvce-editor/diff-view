import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-undo-redo'
export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, KeyBoard, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'start')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'start')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  await Command.execute('DiffView.handleInput', 'A')
  await Command.execute('DiffView.handleInput', 'B')

  await expect(afterRows).toHaveText('startAB')

  // Undo (Ctrl+z)
  await KeyBoard.press('Control+z')
  await expect(afterRows).toHaveText('startA')

  // Redo (Ctrl+y)
  await KeyBoard.press('Control+y')
  await expect(afterRows).toHaveText('startAB')
}
