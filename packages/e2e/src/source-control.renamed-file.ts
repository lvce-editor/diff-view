import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.renamed-file'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test-renamed.css`, `abc`)
  await Command.execute('ExtensionHost.executeCommand', `sampleSourceControl.rename`, `${tmpDir}/test.css`, `${tmpDir}/test-renamed.css`)
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  // act
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  await expect(treeItems.nth(0)).toHaveText('Staged Changes1')
  await expect(treeItems.nth(1)).toHaveText('test-renamed.css')
}
