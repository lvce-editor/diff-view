import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.one-char-change'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const value = cat`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const value = cut`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const changedTokens = Locator('.DiffToken--changed')
  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')
  await expect(changedTokens).toHaveCount(2)
}
