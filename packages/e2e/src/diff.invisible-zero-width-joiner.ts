import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-zero-width-joiner'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `cooperate`)
  await FileSystem.writeFile(
    `${tmpDir}/file-2.txt`,
    `co
operate`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('cooperate')
  await expect(afterPane).toContainText('cooperate')
  await expect(changedTokens).toHaveCount(2)
}
