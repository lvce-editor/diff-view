import type { Test } from '@lvce-editor/test-with-playwright'

const getContent = (): string => {
  const lines: string[] = []

  for (let lineNumber = 1; lineNumber <= 5000; lineNumber++) {
    lines.push(`line ${lineNumber}`)
  }

  return lines.join('\n')
}

export const name = 'diff.five-thousand-lines-added'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getContent())
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toHaveText('')
  await expect(contentRight).toContainText('line 1')
  await expect(Locator('.ScrollBar')).toHaveCount(1)

  // await contentRight.dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: 100_000 })

  // await expect(insertedRows.last()).toContainText('line 5000')
}
