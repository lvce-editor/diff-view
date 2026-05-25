import type { Test } from '@lvce-editor/test-with-playwright'

const expectRowsToHaveText = async (expect: any, rows: any, texts: readonly string[]): Promise<void> => {
  for (let index = 0; index < texts.length; index += 1) {
    const row = rows.nth(index)
    await expect(row).toHaveText(texts[index])
  }
}

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
  await expectRowsToHaveText(expect, leftLineNumbers, ['1', '', '', '', ''])
}
