import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.trailing-newlines-at-end'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const afterContent = 'abc' + '\n'.repeat(100)
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, 'abc')
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, afterContent)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(contentLeft).toHaveText('abc')
  await expect(contentRight).toHaveText('abc')
  // TODO verify number of rows somehow
}
