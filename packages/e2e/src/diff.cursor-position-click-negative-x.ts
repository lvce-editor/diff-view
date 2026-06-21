import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.cursor-position-click-negative-x'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta\ngamma')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toBeVisible()

  await Command.execute('DiffView.handleClickRightSide', -100, 120)

  await expect(cursor).toHaveCSS('left', '41px')
  await expect(cursor).toHaveCSS('top', '40px')
}
