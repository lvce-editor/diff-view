import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-typescript'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.ts`, `const leftValue = 1`)
  await FileSystem.writeFile(`${tmpDir}/file-2.ts`, `const rightValue = 2`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.ts<->${tmpDir}/file-2.ts`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(Locator('.DiffEditorContentLeft .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentLeft .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Numeric')).toHaveCount(1)
  await expect(beforePane).toContainText('const leftValue = 1')
  await expect(afterPane).toContainText('const rightValue = 2')
  await expect(beforePane).not.toContainText('rightValue')
  await expect(afterPane).not.toContainText('leftValue')
}
