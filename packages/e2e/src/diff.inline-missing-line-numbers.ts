import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inline-missing-line-numbers'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `c`)
  await FileSystem.writeFile(
    `${tmpDir}/file-2.txt`,
    `a
b
c
d`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const leftLineNumbers = Locator('.DiffEditorContentLeft .DiffEditorLineNumber')

  await expect(contentLeft).toHaveText('c')
  await expect(contentRight).toHaveText('aabcd')

  await expect(leftLineNumbers).toHaveCount(5)

  await expect(leftLineNumbers.nth(0)).toHaveText('1')
  await expect(leftLineNumbers.nth(1)).toHaveText('')
  await expect(leftLineNumbers.nth(2)).toHaveText('')
  await expect(leftLineNumbers.nth(3)).toHaveText('')
  await expect(leftLineNumbers.nth(4)).toHaveText('')
}
