import type { Test } from '@lvce-editor/test-with-playwright'

const getDeletedContent = (): string => {
  const lines: string[] = []

  for (let lineNumber = 1; lineNumber <= 250_000; lineNumber++) {
    lines.push(`deleted line ${lineNumber}`)
  }

  return lines.join('\n')
}

export const name = 'diff.two-hundred-fifty-thousand-lines-deleted'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getDeletedContent())
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforeRows).toBeVisible()
  await expect(beforeRows).toContainText('deleted line 1')
  await expect(afterRows).toHaveText('')
  await expect(Locator('.ScrollBar')).toHaveCount(1)
}
