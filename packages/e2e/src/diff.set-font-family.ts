import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.set-font-family'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta\ngamma')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\nbeta\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const rows = Locator('.DiffEditorRows')
  await expect(rows).toBeVisible()

  await Command.execute('DiffView.setFontFamily', 'serif')

  await expect(rows).toHaveCSS('font-family', 'serif')
}
