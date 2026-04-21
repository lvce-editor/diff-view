import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-markdown'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file-1.md`,
    `# Project Notes

- left item
- shared item

This is the left document.
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/file-2.md`,
    `# Project Notes

- right item
- shared item

This is the right document.
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.md<->${tmpDir}/file-2.md`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('Project Notes')
  await expect(contentLeft).toContainText('left item')
  await expect(contentLeft).toContainText('shared item')
  await expect(contentLeft).toContainText('This is the left document.')
  await expect(contentRight).toContainText('Project Notes')
  await expect(contentRight).toContainText('right item')
  await expect(contentRight).toContainText('shared item')
  await expect(contentRight).toContainText('This is the right document.')
}
