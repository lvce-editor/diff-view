import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-no-break-space'


export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const noBreakSpace = decodeURIComponent('%C2%A0')
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `alpha beta`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `alpha${noBreakSpace}beta`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('alpha beta')
  await expect(afterPane).toContainText(`alpha${noBreakSpace}beta`)
  await expect(changedTokens).toHaveCount(2)
}
