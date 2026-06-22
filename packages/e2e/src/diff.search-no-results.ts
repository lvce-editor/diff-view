import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.search-no-results'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'gamma\ndelta')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  await Command.execute('DiffView.showSearch')
  // await KeyBoard.press('Control+f')

  const searchInput = Locator('.DiffSearchInput')

  const searchWidget = Locator('.DiffSearchWidget')
  const matchCount = Locator('.DiffSearchMatchCount')
  const matches = Locator('.DiffSearchMatch')

  await Command.execute('DiffView.handleSearchInput', 'missing')

  await expect(searchWidget).toHaveClass('DiffSearchWidget DiffSearchWidgetNoResults')
  await expect(matchCount).toHaveText('0 of 0')
  await expect(matches).toHaveCount(0)
}
