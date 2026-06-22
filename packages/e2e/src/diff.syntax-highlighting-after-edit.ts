import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-after-edit'

export const skip = 0

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.ts`, `const leftValue = 1`)
  await FileSystem.writeFile(`${tmpDir}/file-2.ts`, `const rightValue = 2`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.ts`, `${tmpDir}/file-2.ts`)

  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  const keywordLocator = Locator('.DiffEditorContentRight .Token.Keyword')
  await expect(keywordLocator).toHaveCount(1)
  const numericLocator = Locator('.DiffEditorContentRight .Token.Numeric')
  await expect(numericLocator).toHaveCount(1)

  // insert a new const line via input
  await Command.execute('DiffView.handleInput', 'const inserted = 3\n')

  await expect(afterPane).toContainText('const inserted = 3')
  // tokenization should be re-requested and applied
  await expect(keywordLocator).toHaveCount(2)
  await expect(numericLocator).toHaveCount(2)
}
