import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `function loadUserProfileSummary() {}`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `function loadUserProfileCard() {}`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const changedTokens = Locator('.DiffToken--changed')
  const hero = Locator('.DiffHero')

  await expect(hero).toContainText('Long Inline Change')
  await expect(changedTokens).toHaveCount(4)
  await expect(Locator('.DiffEditorContentLeft .DiffEditorRows')).toContainText('loadUserProfileSummary')
  await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('loadUserProfileCard')
}
