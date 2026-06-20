import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-single-token'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const beforeToken = `prefix-${'a'.repeat(5000)}-suffix`
  const afterToken = `prefix-${'b'.repeat(5000)}-suffix`
  await FileSystem.writeFile(`${tmpDir}/before.txt`, beforeToken)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, afterToken)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toContainText('prefix-')
  await expect(leftRows).toContainText('-suffix')
  await expect(rightRows).toContainText('prefix-')
  await expect(rightRows).toContainText('-suffix')
}
