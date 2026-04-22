import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-deletion-at-start-and-end'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file-1.txt`,
    `a
b
c
d`,
  )
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `c`)
  await Workspace.setPath(tmpDir)

  // act
  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  // assert
  const leftRows = Locator('.DiffEditorContentLeft .EditorRow')
  const rightRows = Locator('.DiffEditorContentRight .EditorRow')
  const leftLineNumbers = Locator('.DiffEditorContentLeft .DiffEditorLineNumber')
  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')

  await expect(leftRows.nth(0)).toHaveText('a')
  await expect(leftRows.nth(1)).toHaveText('b')
  await expect(leftRows.nth(2)).toHaveText('c')
  await expect(leftRows.nth(3)).toHaveText('d')

  await expect(rightRows.nth(0)).toHaveText('')
  await expect(rightRows.nth(1)).toHaveText('')
  await expect(rightRows.nth(2)).toHaveText('c')
  await expect(rightRows.nth(3)).toHaveText('')

  await expect(leftLineNumbers.nth(0)).toHaveText('1')
  await expect(leftLineNumbers.nth(1)).toHaveText('2')
  await expect(leftLineNumbers.nth(2)).toHaveText('3')
  await expect(leftLineNumbers.nth(3)).toHaveText('4')

  await expect(rightLineNumbers.nth(0)).toHaveText('')
  await expect(rightLineNumbers.nth(1)).toHaveText('')
  await expect(rightLineNumbers.nth(2)).toHaveText('1')
  await expect(rightLineNumbers.nth(3)).toHaveText('')
}
