import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inner-multiple-word-highlights'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const theme = 'light compact layout'`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const theme = 'dark compact grid'`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeChangedTokens = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const afterChangedTokens = Locator('.DiffEditorContentRight .DiffToken--changed')
  const beforeFirstChangedToken = beforeChangedTokens.nth(0)
  const beforeSecondChangedToken = beforeChangedTokens.nth(1)
  const afterFirstChangedToken = afterChangedTokens.nth(0)
  const afterSecondChangedToken = afterChangedTokens.nth(1)

  await expect(beforePane).toContainText(`const theme = 'light compact layout'`)
  await expect(afterPane).toContainText(`const theme = 'dark compact grid'`)
  await expect(beforeChangedTokens).toHaveCount(2)
  await expect(afterChangedTokens).toHaveCount(2)
  await expect(beforeFirstChangedToken).toHaveText('light')
  await expect(beforeSecondChangedToken).toHaveText('layout')
  await expect(afterFirstChangedToken).toHaveText('dark')
  await expect(afterSecondChangedToken).toHaveText('grid')
}
