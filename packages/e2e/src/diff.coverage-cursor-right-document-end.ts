import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cursor-right-document-end'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 5, 0)
  await Command.execute('DiffView.moveCursorRight')

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '94px')
  await expect(cursor).toHaveCSS('top', '0px')
}
