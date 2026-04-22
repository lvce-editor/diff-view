import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-zero-width-non-joiner'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `reenter`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `re\u200Center`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('reenter')
  await expect(afterPane).toContainText('reenter')
  await expect(changedTokens).toHaveCount(2)
}
