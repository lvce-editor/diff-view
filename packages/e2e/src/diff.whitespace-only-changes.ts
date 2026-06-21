import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.whitespace-only-changes'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `function main() {
  const value = 1

  return value
}`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `function main() {
\tconst value = 1
    
    return value
}`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(beforeRows).toContainText('const value = 1')
  await expect(afterRows).toContainText('const value = 1')
  await expect(beforeRows).toContainText('return value')
  await expect(afterRows).toContainText('return value')
  const changedToken = Locator('.DiffToken--changed').first()
  await expect(changedToken).toBeVisible()
}
