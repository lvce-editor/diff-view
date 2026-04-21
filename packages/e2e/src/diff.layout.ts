import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.layout'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `const value = cat`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `const value = cut`)
  await Workspace.setPath(tmpDir)
  await Command.execute('DiffView.setLayout', 'horizontal')

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const horizontalRoot = Locator('.DiffPrototypeLayout--horizontal')
  const horizontalSash = Locator('.SashVertical')

  await expect(horizontalRoot).toBeVisible()
  await expect(horizontalSash).toHaveCount(1)

  await Command.execute('DiffView.setLayout', 'vertical')

  const verticalRoot = Locator('.DiffPrototypeLayout--vertical')
  const verticalSash = Locator('.SashHorizontal')

  await expect(verticalRoot).toBeVisible()
  await expect(verticalSash).toHaveCount(1)
}
