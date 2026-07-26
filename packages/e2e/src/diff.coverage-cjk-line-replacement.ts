import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-cjk-line-replacement'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, '状態: 保留')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, '状態: 完了')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toHaveText('状態: 保留')
  await expect(rightRows).toHaveText('状態: 完了')
}
