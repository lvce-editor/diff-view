import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.inline-scrolling'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = Array.from({ length: 900 }, (_, index) => `shared line ${index + 1}`).join('\n')
  await FileSystem.writeFile(`${tmpDir}/before.txt`, `${content}\nbottom before`)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, `${content}\nbottom after`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineRows).toContainText('shared line 1')
  await inlineRows.dispatchEvent('wheel', {
    bubbles: true,
    deltaMode: 0,
    deltaY: 9_999_999,
  } as unknown as string)

  await expect(inlineRows).toContainText('- bottom before')
  await expect(inlineRows).toContainText('+ bottom after')

  await inlineRows.dispatchEvent('wheel', {
    bubbles: true,
    deltaMode: 0,
    deltaY: -9_999_999,
  } as unknown as string)

  await expect(inlineRows).toContainText('shared line 1')
}
