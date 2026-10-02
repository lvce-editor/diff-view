import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.cursor-navigation-deleted-line'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'first\ndeleted\nlast')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'first\nlast')
  await Workspace.setPath(tmpDir)
  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const cursor = Locator('.EditorCursorRight')
  await Command.execute('DiffView.setCursorPosition', 0, 0)
  await expect(cursor).toHaveCSS('top', '0px')
  await Command.execute('DiffView.moveCursorDown')
  await expect(cursor).toHaveCSS('top', '40px')
  await Command.execute('DiffView.moveCursorUp')
  await expect(cursor).toHaveCSS('top', '0px')
}
