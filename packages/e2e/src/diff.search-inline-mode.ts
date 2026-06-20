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
  const searchInput = Locator('.DiffSearchInput')
  const matchCount = Locator('.DiffSearchMatchCount')
  const inlineMatches = Locator('.InlineDiffEditor .DiffSearchMatch')
  const currentMatch = Locator('.InlineDiffEditor .DiffSearchMatchCurrent')

  await searchInput.type('alpha')
  await searchInput.dispatchEvent('input', { bubbles: true } as any)

  await expect(inlineEditor).toBeVisible()
  await expect(matchCount).toHaveText('1 of 4')
  await expect(inlineMatches).toHaveCount(4)
  await expect(currentMatch).toHaveCount(1)

  await Command.execute('DiffView.setDiffMode', 'side-by-side')
  await expect(matchCount).toHaveText('1 of 4')
  await expect(Locator('.DiffEditorHorizontal .DiffSearchMatch')).toHaveCount(4)
}
