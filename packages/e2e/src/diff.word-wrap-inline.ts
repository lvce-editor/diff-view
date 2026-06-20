import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.word-wrap-inline'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const beforeLine = 'inline word wrap before content '.repeat(40)
  const afterLine = 'inline word wrap after content '.repeat(40)

  await FileSystem.writeFile(`${tmpDir}/before.txt`, beforeLine)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, afterLine)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')
  await Command.execute('DiffView.setWordWrap', true)

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')

  await expect(inlineRows).toContainText(beforeLine)
  await expect(inlineRows).toContainText(afterLine)
}
