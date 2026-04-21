import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-go'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file-1.go`,
    `package main

func main() {
	value := 1
	_ = value
}`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/file-2.go`,
    `package main

func main() {
	value := 2
	_ = value
}`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.go<->${tmpDir}/file-2.go`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('package main')
  await expect(contentLeft).toContainText('value := 1')
  await expect(contentRight).toContainText('package main')
  await expect(contentRight).toContainText('value := 2')
}
