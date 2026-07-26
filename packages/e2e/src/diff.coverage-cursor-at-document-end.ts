import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cursor-at-document-end'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 4, 1)

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '85px')
  await expect(cursor).toHaveCSS('top', '20px')
}
