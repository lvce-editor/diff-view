import type { Test } from '@lvce-editor/test-with-playwright'

const getContent = (): string => {
  const lines: string[] = []

  for (let lineNumber = 1; lineNumber <= 1000; lineNumber++) {
    lines.push(`line ${lineNumber}`)
  }

  return lines.join('\n')
}

export const name = 'diff.thousand-lines-added'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getContent())
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')

  await expect(contentLeft).toHaveText('')
  await expect(contentRight).toContainText('line 1')
  await expect(Locator('.ScrollBar')).toHaveCount(1)
}
