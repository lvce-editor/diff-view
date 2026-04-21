import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.layout-preserves-content'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const value = cat`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const value = cut`)
  await Workspace.setPath(tmpDir)
  await Command.execute('DiffView.setLayout', 'horizontal')

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(Locator('.DiffPrototypeLayout--horizontal')).toBeVisible()
  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')

  await Command.execute('DiffView.setLayout', 'vertical')

  await expect(Locator('.DiffPrototypeLayout--vertical')).toBeVisible()
  await expect(beforePane).toContainText('const value = cat')
  await expect(afterPane).toContainText('const value = cut')
}
