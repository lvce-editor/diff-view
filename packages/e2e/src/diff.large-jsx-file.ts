import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.large-jsx-file'

// export const skip = 1

export const test: Test = async ({ DiffView, FileSystem, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/large-jsx-file')
  const tmpDir = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  // TODO
  // const beforeDeletion = Locator('.EditorRow.Deletion')
  // await expect(beforeDeletion).toHaveText('a')

  // const afterInsertion = Locator('.EditorRow.Insertion')
  // await expect(afterInsertion).toHaveText('b')
}
