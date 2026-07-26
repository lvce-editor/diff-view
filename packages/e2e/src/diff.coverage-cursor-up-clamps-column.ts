import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cursor-up-clamps-column'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'a\ngamma')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'a\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 5, 1)
  await Command.execute('DiffView.moveCursorUp')

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '58px')
  await expect(cursor).toHaveCSS('top', '0px')
}
