import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.workspace-change-reloads'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `def`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `same`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `same`)

  await Command.execute('DiffView.handleWorkspaceChange')

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(contentLeft).toHaveText('same')
  await expect(contentRight).toHaveText('same')
  await expect(changedTokens).toHaveCount(0)
}
