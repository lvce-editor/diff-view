import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `function loadUserProfileSummary() {}`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `function loadUserProfileCard() {}`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const changedTokens = Locator('.DiffToken--changed')
  const hero = Locator('.DiffHero')

  await expect(hero).toContainText('Long Inline Change')
  await expect(changedTokens).toHaveCount(4)
  const expectedLocator0 = Locator('.DiffEditorContentLeft .DiffEditorRows')
  await expect(expectedLocator0).toContainText('loadUserProfileSummary')
  const expectedLocator1 = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(expectedLocator1).toContainText('loadUserProfileCard')
}
