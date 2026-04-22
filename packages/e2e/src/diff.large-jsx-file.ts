import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.large-jsx-file'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/large-jsx-file')
  const tmpDir = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/before.txt<->${tmpDir}/after.txt`)

  const beforeDeletion = Locator('.EditorRow.Deletion')
  await expect(beforeDeletion).toHaveText('a')

  const afterInsertion = Locator('.EditorRow.Insertion')
  await expect(afterInsertion).toHaveText('b')
}
