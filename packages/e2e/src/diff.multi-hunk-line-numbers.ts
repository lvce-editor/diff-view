import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.multi-hunk-line-numbers'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `line 1
before top
line 3
line 4
before middle
line 6
line 7
before bottom`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `line 1
after top
line 3
line 4
after middle
line 6
line 7
after bottom`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const leftLineNumbers = Locator('.DiffEditorContentLeft .DiffEditorLineNumber')
  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftLineNumbers.first()).toHaveText('1')
  await expect(rightLineNumbers.first()).toHaveText('1')
  await expect(leftRows).toContainText('before top')
  await expect(rightRows).toContainText('after top')
  await expect(leftRows).toContainText('before middle')
  await expect(rightRows).toContainText('after middle')
  await expect(leftRows).toContainText('before bottom')
  await expect(rightRows).toContainText('after bottom')
}
