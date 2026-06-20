import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.mode-switch-resize-roundtrip'


export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `same
before
shared`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `same
after
shared`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')
  await Command.execute('DiffView.handleResize', 420, 180)

  const inlineEditor = Locator('.InlineDiffEditor')
  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineEditor).toBeVisible()
  await expect(inlineRows).toContainText('- before')
  await expect(inlineRows).toContainText('+ after')

  await Command.execute('DiffView.setDiffMode', 'side-by-side')

  const horizontalEditor = Locator('.DiffEditorHorizontal')
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(horizontalEditor).toBeVisible()
  await expect(leftRows).toContainText('before')
  await expect(rightRows).toContainText('after')

  await Command.execute('DiffView.setDiffMode', 'inline')

  await expect(inlineEditor).toBeVisible()
  await expect(inlineRows).toContainText('- before')
  await expect(inlineRows).toContainText('+ after')
}
