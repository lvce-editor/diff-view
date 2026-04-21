import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.long-inline-change-pane-highlights'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `function loadUserProfileSummary() {}`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `function loadUserProfileCard() {}`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(Locator('.DiffPane--before .DiffToken--changed')).toHaveCount(2)
  await expect(Locator('.DiffPane--after .DiffToken--changed')).toHaveCount(2)
  await expect(beforePane).not.toContainText('loadUserProfileCard')
  await expect(afterPane).not.toContainText('loadUserProfileSummary')
}
