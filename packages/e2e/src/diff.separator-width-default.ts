import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.separator-width-default'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'a')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'b')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const sash = Locator('.DiffEditor .Sash').first()

  await expect(sash).toHaveCSS('width', '6px')
}
