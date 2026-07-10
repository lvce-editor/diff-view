import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.pane-flex-sizing'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'before')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'after')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftPane = Locator('.DiffEditorContentLeft')
  const rightPane = Locator('.DiffEditorContentRight')
  await expect(leftPane).toHaveCSS('flex-grow', '0')
  await expect(leftPane).toHaveCSS('flex-shrink', '0')
  await expect(rightPane).toHaveCSS('flex-grow', '0')
  await expect(rightPane).toHaveCSS('flex-shrink', '0')
}
