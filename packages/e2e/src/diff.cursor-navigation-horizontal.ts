import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.cursor-navigation-horizontal'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const cursor = Locator('.EditorCursorRight')
  await Command.execute('DiffView.setCursorPosition', 4, 0)
  await expect(cursor).toHaveCSS('left', '84px')
  await expect(cursor).toHaveCSS('top', '0px')

  await Command.execute('DiffView.moveCursorRight')
  await expect(cursor).toHaveCSS('left', '92px')

  await Command.execute('DiffView.moveCursorRight')
  await expect(cursor).toHaveCSS('left', '52px')
  await expect(cursor).toHaveCSS('top', '20px')

  await Command.execute('DiffView.moveCursorLeft')
  await expect(cursor).toHaveCSS('left', '92px')
  await expect(cursor).toHaveCSS('top', '0px')
}
