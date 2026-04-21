import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-before-pane-isolation'

// export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `abc`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane.locator('.DiffEditorRows')).toHaveText('')
  await expect(beforePane.locator('.DiffRow--deleted')).toHaveCount(0)
  await expect(afterPane.locator('.DiffRow--inserted')).toHaveCount(1)
}
