import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-no-scrollbar'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `def`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')

  await expect(contentLeft).toHaveText('')
  await expect(contentRight).toHaveText('def')
  await expect(Locator('.ScrollBar')).toHaveCount(0)
}
