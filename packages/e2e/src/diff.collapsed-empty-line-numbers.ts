import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.collapsed-empty-line-numbers'

const getDeletedContent = (): string => {
  const lines: string[] = []

  for (let lineNumber = 1; lineNumber <= 12; lineNumber++) {
    lines.push(`deleted line ${lineNumber}`)
  }

  return lines.join('\n')
}

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getDeletedContent())
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `deleted line 1`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')
  const rightEmptyLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumberEmpty')

  await expect(rightLineNumbers).toHaveCount(1)
  await expect(rightLineNumbers.nth(0)).toHaveText('1')
  await expect(rightEmptyLineNumbers).toHaveCount(1)
  await expect(rightEmptyLineNumbers.nth(0)).toHaveAttribute('style', 'height: 220px;')
}
