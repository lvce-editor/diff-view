import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-insertion-at-start-and-end'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `c`)
  await FileSystem.writeFile(
    `${tmpDir}/file-2.txt`,
    `a
b
c
d`,
  )
  await Workspace.setPath(tmpDir)

  // act
  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  // assert
  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(contentLeft).toHaveText('c')
  await expect(contentRight).toHaveText('aabcd') // TODO
}
