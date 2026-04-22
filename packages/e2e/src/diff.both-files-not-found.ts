import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.both-files-not-found'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/before.txt<->${tmpDir}/after.txt`)

  const beforeError = Locator('.DiffEditorContentLeft .DiffEditorErrorMessage')
  const afterError = Locator('.DiffEditorContentRight .DiffEditorErrorMessage')
  const errorStacks = Locator('.DiffEditorErrorStack')
  const errorStackLinks = Locator('.DiffEditorErrorStackLink')

  await expect(beforeError).toBeVisible()
  await expect(afterError).toBeVisible()
  await expect(errorStacks).toHaveCount(2)
  // await expect(errorStackLinks).toHaveCount(2)
}
