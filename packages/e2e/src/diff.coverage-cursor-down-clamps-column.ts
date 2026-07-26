import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cursor-down-clamps-column'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nb')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nb')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 5, 0)
  await Command.execute('DiffView.moveCursorDown')

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '58px')
  await expect(cursor).toHaveCSS('top', '20px')
}
