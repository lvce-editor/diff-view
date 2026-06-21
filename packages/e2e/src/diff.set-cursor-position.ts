import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.set-cursor-position'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta\ngamma')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toBeVisible()

  await Command.execute('DiffView.setCursorPosition', 3, 2)

  await expect(cursor).toHaveCSS('left', '77px')
  await expect(cursor).toHaveCSS('top', '40px')
}
