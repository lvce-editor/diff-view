import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-inline'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/file.ts`
  await FileSystem.writeFile(filePath, 'const value = 2')
  await Workspace.setUri(tmpDir)

  await Main.openUri(`inline-diff://data://const value = 1<->${filePath}`)

  const diffEditor = Locator('.Viewlet.DiffEditor')
  await expect(diffEditor).toBeVisible()
  await expect(Locator('.MainTab')).toHaveText('file.ts (Working Tree)')
}
