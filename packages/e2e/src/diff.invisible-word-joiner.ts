import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-word-joiner'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `resume`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `re\u2060sume`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('resume')
  await expect(afterPane).toContainText('re0sume')
  await expect(changedTokens).toHaveCount(2)
}
