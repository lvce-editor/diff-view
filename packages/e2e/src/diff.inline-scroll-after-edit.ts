import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inline-scroll-after-edit'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const before = Array.from({ length: 120 }, (_, index) => `old line ${index}`).join('\n')
  const after = Array.from({ length: 120 }, (_, index) => `new line ${index}`).join('\n')
  await FileSystem.writeFile(`${tmpDir}/before.txt`, before)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, after)
  await Workspace.setPath(tmpDir)
  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')
  await Command.execute('DiffView.setCursorPosition', 0, 0)
  await Command.execute('DiffView.insertLineBreak')

  const rows = Locator('.InlineDiffEditor .DiffEditorRows')
  await rows.dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: 9_999_999 } as unknown as string)
  await expect(rows).toContainText('- old line 119')
  await expect(rows).toContainText('+ new line 119')
}
