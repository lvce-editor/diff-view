import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-combining-mark-replacement'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'Cafe\u{301}')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'Cafe')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const changedTokens = Locator('.DiffToken--changed')
  await expect(changedTokens).toHaveCount(1)
  await expect(changedTokens).toHaveText('\u{301}')
}
