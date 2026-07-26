import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cursor-at-document-start'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setCursorPosition', 0, 0)

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toHaveCSS('left', '49px')
  await expect(cursor).toHaveCSS('top', '0px')
}
