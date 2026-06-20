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

  const expectedLocator0 = leftLineNumbers.nth(0)
  await expect(expectedLocator0).toHaveText('1')
  const expectedLocator1 = leftLineNumbers.nth(1)
  await expect(expectedLocator1).toHaveText('')
  const expectedLocator2 = leftLineNumbers.nth(2)
  await expect(expectedLocator2).toHaveText('')
  const expectedLocator3 = leftLineNumbers.nth(3)
  await expect(expectedLocator3).toHaveText('')
  const expectedLocator4 = leftLineNumbers.nth(4)
  await expect(expectedLocator4).toHaveText('')
}
