import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.cursor-position-click-negative-y'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta\ngamma')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const cursor = Locator('.EditorCursorRight')
  await expect(cursor).toBeVisible()

  await Command.execute('DiffView.handleClickRightSide', 1000, -100)

  await expect(cursor).toHaveCSS('top', '0px')
}
