import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.line-number-flex-shrink'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'beta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const lineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber').first()
  await expect(lineNumber).toHaveCount(1)
  await expect(lineNumber).toHaveCSS('flex-shrink', '0')
}
