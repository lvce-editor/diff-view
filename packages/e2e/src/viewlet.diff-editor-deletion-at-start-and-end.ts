import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-deletion-at-start-and-end'

// export const skip = 1

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

  const expectedLocator0 = leftRows.nth(0)
  await expect(expectedLocator0).toHaveText('a')
  const expectedLocator1 = leftRows.nth(1)
  await expect(expectedLocator1).toHaveText('b')
  const expectedLocator2 = leftRows.nth(2)
  await expect(expectedLocator2).toHaveText('c')
  const expectedLocator3 = leftRows.nth(3)
  await expect(expectedLocator3).toHaveText('d')

  const expectedLocator4 = rightRows.nth(0)
  await expect(expectedLocator4).toHaveText('')
  const expectedLocator5 = rightRows.nth(1)
  await expect(expectedLocator5).toHaveText('')
  const expectedLocator6 = rightRows.nth(2)
  await expect(expectedLocator6).toHaveText('c')
  const expectedLocator7 = rightRows.nth(3)
  await expect(expectedLocator7).toHaveText('')

  const expectedLocator8 = leftLineNumbers.nth(0)
  await expect(expectedLocator8).toHaveText('1')
  const expectedLocator9 = leftLineNumbers.nth(1)
  await expect(expectedLocator9).toHaveText('2')
  const expectedLocator10 = leftLineNumbers.nth(2)
  await expect(expectedLocator10).toHaveText('3')
  const expectedLocator11 = leftLineNumbers.nth(3)
  await expect(expectedLocator11).toHaveText('4')

  const expectedLocator12 = rightLineNumbers.nth(0)
  await expect(expectedLocator12).toHaveText('')
  const expectedLocator13 = rightLineNumbers.nth(1)
  await expect(expectedLocator13).toHaveText('')
  const expectedLocator14 = rightLineNumbers.nth(2)
  await expect(expectedLocator14).toHaveText('1')
  const expectedLocator15 = rightLineNumbers.nth(3)
  await expect(expectedLocator15).toHaveText('')
}
