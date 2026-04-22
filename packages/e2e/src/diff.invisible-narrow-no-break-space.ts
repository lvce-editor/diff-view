import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.invisible-narrow-no-break-space'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `hello world`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `hello\u202Fworld`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const changedTokens = Locator('.DiffToken--changed')

  await expect(beforePane).toContainText('hello world')
  await expect(afterPane).toContainText('helloworld')
  await expect(changedTokens).toHaveCount(2)
}
