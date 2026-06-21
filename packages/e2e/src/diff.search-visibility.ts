import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.search-visibility'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const searchHeader = Locator('.DiffSearchHeader')
  const searchInput = Locator('.DiffSearchInput')

  await expect(searchInput).toHaveCount(0)

  await Command.execute('DiffView.showSearch')

  await expect(searchHeader).toBeVisible()
  await expect(searchInput).toBeVisible()

  await Command.execute('DiffView.hideSearch')

  await expect(searchInput).toHaveCount(0)
}
