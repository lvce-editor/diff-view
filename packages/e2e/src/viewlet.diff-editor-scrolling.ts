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

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getLargeFileContent('bottom change before'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getLargeFileContent('bottom change after'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const line1 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1',
  })
  await expect(line1).toBeVisible()

  const contentRight = Locator('.DiffEditorContentRight')
  await contentRight.dispatchEvent('wheel', {
    bubbles: true,
    deltaMode: 0,
    deltaY: 9_999_999,
  } as unknown as string)

  const line1800 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1800',
  })
  await expect(line1800).toBeVisible()
}
