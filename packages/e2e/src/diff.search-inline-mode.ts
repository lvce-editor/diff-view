import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.search-inline-mode'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, KeyBoard, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `alpha before
shared
alpha removed`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `alpha after
shared
alpha added`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  await KeyBoard.press('Control+f')

  const inlineEditor = Locator('.InlineDiffEditor')
  const matchCount = Locator('.DiffSearchMatchCount')
  const inlineMatches = Locator('.InlineDiffEditor .DiffSearchMatch')
  const currentMatch = Locator('.InlineDiffEditor .DiffSearchMatchCurrent')
  const horizontalMatches = Locator('.DiffEditorHorizontal .DiffSearchMatch')

  await Command.execute('DiffView.handleSearchInput', 'alpha')

  await expect(inlineEditor).toBeVisible()
  await expect(matchCount).toHaveText('1 of 4')
  await expect(inlineMatches).toHaveCount(4)
  await expect(currentMatch).toHaveCount(1)

  await Command.execute('DiffView.setDiffMode', 'side-by-side')
  await expect(matchCount).toHaveText('1 of 4')
  await expect(horizontalMatches).toHaveCount(4)
}
