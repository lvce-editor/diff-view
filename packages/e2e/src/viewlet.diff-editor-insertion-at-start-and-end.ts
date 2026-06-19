import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion-at-start-and-end'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  // arrange
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

  // act
  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  // assert
  const leftRows = Locator('.DiffEditorContentLeft .EditorRow')
  const rightRows = Locator('.DiffEditorContentRight .EditorRow')
  const leftLineNumbers = Locator('.DiffEditorContentLeft .DiffEditorLineNumber')
  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')

  const expectedLocator0 = leftRows.nth(0)
  await expect(expectedLocator0).toHaveText('')
  const expectedLocator1 = leftRows.nth(1)
  await expect(expectedLocator1).toHaveText('')
  const expectedLocator2 = leftRows.nth(2)
  await expect(expectedLocator2).toHaveText('1c')
  const expectedLocator3 = leftRows.nth(3)
  await expect(expectedLocator3).toHaveText('')

  const expectedLocator4 = rightRows.nth(0)
  await expect(expectedLocator4).toHaveText('1a')
  const expectedLocator5 = rightRows.nth(1)
  await expect(expectedLocator5).toHaveText('2b')
  const expectedLocator6 = rightRows.nth(2)
  await expect(expectedLocator6).toHaveText('3c')
  const expectedLocator7 = rightRows.nth(3)
  await expect(expectedLocator7).toHaveText('4d')

  const expectedLocator8 = leftLineNumbers.nth(0)
  await expect(expectedLocator8).toHaveText('')
  const expectedLocator9 = leftLineNumbers.nth(1)
  await expect(expectedLocator9).toHaveText('')
  const expectedLocator10 = leftLineNumbers.nth(2)
  await expect(expectedLocator10).toHaveText('1')
  const expectedLocator11 = leftLineNumbers.nth(3)
  await expect(expectedLocator11).toHaveText('')

  const expectedLocator12 = rightLineNumbers.nth(0)
  await expect(expectedLocator12).toHaveText('1')
  const expectedLocator13 = rightLineNumbers.nth(1)
  await expect(expectedLocator13).toHaveText('2')
  const expectedLocator14 = rightLineNumbers.nth(2)
  await expect(expectedLocator14).toHaveText('3')
  const expectedLocator15 = rightLineNumbers.nth(3)
  await expect(expectedLocator15).toHaveText('4')
}
