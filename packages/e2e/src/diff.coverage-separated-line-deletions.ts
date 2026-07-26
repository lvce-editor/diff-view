import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-separated-line-deletions'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'removed first\none\ntwo\nremoved second\nthree')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'one\ntwo\nthree')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const secondDeletedRow = deletedRows.nth(1)
  await expect(deletedRows).toHaveCount(2)
  await expect(deletedRows.first()).toHaveText('removed first')
  await expect(secondDeletedRow).toHaveText('removed second')
}
