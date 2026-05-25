import type { Test } from '@lvce-editor/test-with-playwright'

const expectRowsToHaveText = async (expect: any, rows: any, texts: readonly string[]): Promise<void> => {
  for (let index = 0; index < texts.length; index += 1) {
    const row = rows.nth(index)
    await expect(row).toHaveText(texts[index])
  }
}

export const name = 'sample.diff-editor-deletion-at-start-and-end'

export const skip = 1

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

  await expectRowsToHaveText(expect, leftRows, ['a', 'b', 'c', 'd'])
  await expectRowsToHaveText(expect, rightRows, ['', '', 'c', ''])
  await expectRowsToHaveText(expect, leftLineNumbers, ['1', '2', '3', '4'])
  await expectRowsToHaveText(expect, rightLineNumbers, ['', '', '1', ''])
}
