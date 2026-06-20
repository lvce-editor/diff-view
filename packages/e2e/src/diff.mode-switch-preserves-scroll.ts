import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.mode-switch-preserves-scroll'

export const skip = 1

const getLargeFileContent = (changedLine: string): string => {
  const lines: string[] = []
  for (let index = 1; index <= 1600; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push(changedLine)
  return lines.join('\n')
}

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, getLargeFileContent('bottom before'))
  await FileSystem.writeFile(`${tmpDir}/after.txt`, getLargeFileContent('bottom after'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.handleWheel', 9, 9_999_999)

  const bottomLineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', { hasText: '1600' })
  await expect(bottomLineNumber).toBeVisible()

  await Command.execute('DiffView.setDiffMode', 'inline')

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  await expect(inlineRows).toContainText('- bottom before')
  await expect(inlineRows).toContainText('+ bottom after')

  await Command.execute('DiffView.setDiffMode', 'side-by-side')

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toContainText('bottom before')
  await expect(rightRows).toContainText('bottom after')
}
