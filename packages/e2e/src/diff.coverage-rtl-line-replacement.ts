import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-rtl-line-replacement'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'الحالة: قديم')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'الحالة: جديد')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toHaveText('الحالة: قديم')
  await expect(rightRows).toHaveText('الحالة: جديد')
}
