import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.scrollbar-drag'

export const skip = 1

const getLargeFileContent = (bottomLine: string): string => {
  const lines: string[] = []
  for (let index = 1; index <= 900; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push(bottomLine)
  return lines.join('\n')
}

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, getLargeFileContent('drag bottom before'))
  await FileSystem.writeFile(`${tmpDir}/after.txt`, getLargeFileContent('drag bottom after'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const firstLineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', { hasText: '1' })
  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(firstLineNumber).toBeVisible()

  await Command.execute('DiffView.handleScrollBarPointerDown', 20)
  await Command.execute('DiffView.handleScrollBarPointerMove', 400)
  await Command.execute('DiffView.handleScrollBarPointerUp', 400)

  await expect(leftRows).toContainText('drag bottom before')
  await expect(rightRows).toContainText('drag bottom after')
}
