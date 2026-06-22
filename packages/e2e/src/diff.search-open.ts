import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.search-open'

// export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'alpha\nbeta')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'alpha\ngamma')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  await Command.execute('DiffView.showSearch')

  // const searchWidget = Locator('.DiffSearchWidget')
  const searchInput = Locator('.DiffSearchInput')
  // elements available: match count, navigation and close buttons

  // await expect(searchWidget).toBeVisible()
  // await expect(searchInput).toBeFocused() // TODO
  await expect(searchInput).toHaveValue('')
  // await expect(matchCount).toHaveText('0 of 0')
  // await expect(previousButton).toBeVisible()
  // await expect(nextButton).toBeVisible()
  // await expect(closeButton).toBeVisible()
}
