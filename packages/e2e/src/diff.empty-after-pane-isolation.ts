import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.empty-after-pane-isolation'

// export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane.locator('.DiffRow--deleted')).toHaveCount(1)
  await expect(afterPane.locator('.DiffEditorRows')).toHaveText('')
  await expect(afterPane.locator('.DiffRow--inserted')).toHaveCount(0)
}
