import type { Test } from '@lvce-editor/test-with-playwright'

const getLargeFileContent = (bottomLine: string): string => {
  const lines: string[] = []
  for (let index = 1; index <= 1800; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push(bottomLine)
  return lines.join('\n')
}

export const name = 'diff.diff-editor-scrolling'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getLargeFileContent('bottom change before'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getLargeFileContent('bottom change after'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const line1 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1',
  })
  await expect(line1).toBeVisible()

  await Command.execute(`DiffView.handleWheel`, 9, 9_999_999)

  const line1800 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1800',
  })
  await expect(line1800).toBeVisible()
}
