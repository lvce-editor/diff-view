import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.search-side-by-side'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, KeyBoard, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `alpha one
beta shared
alpha deleted
delta`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `alpha one
beta shared
alpha inserted
omega alpha`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  await KeyBoard.press('Control+f')

  const searchInput = Locator('.DiffSearchInput')
  const matchCount = Locator('.DiffSearchMatchCount')
  const matches = Locator('.DiffSearchMatch')
  const currentMatch = Locator('.DiffSearchMatchCurrent')
  const leftMatches = Locator('.DiffEditorContentLeft .DiffSearchMatch')
  const rightMatches = Locator('.DiffEditorContentRight .DiffSearchMatch')

  await Command.execute('DiffView.handleSearchInput', 'alpha')

  await expect(matchCount).toHaveText('1 of 5')
  await expect(matches).toHaveCount(5)
  await expect(leftMatches).toHaveCount(2)
  await expect(rightMatches).toHaveCount(3)
  await expect(currentMatch).toHaveCount(1)
  await expect(currentMatch).toHaveText('alpha')

  await KeyBoard.press('Enter')
  await expect(matchCount).toHaveText('2 of 5')

  await KeyBoard.press('Shift+Enter')
  await expect(matchCount).toHaveText('1 of 5')
}
