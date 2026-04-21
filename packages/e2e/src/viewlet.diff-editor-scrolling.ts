import type { Test } from '@lvce-editor/test-with-playwright'

const getLargeFileContent = (bottomLine: string): string => {
  const lines: string[] = []
  for (let index = 1; index <= 180; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push(bottomLine)
  return lines.join('\n')
}

export const name = 'diff.large-file-diff-at-bottom'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getLargeFileContent('bottom change before'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getLargeFileContent('bottom change after'))
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(Locator('.ScrollBar')).toHaveCount(1)
  await expect(beforePane).not.toContainText('bottom change before')
  await expect(afterPane).not.toContainText('bottom change after')

  await Locator('.DiffEditor').dispatchEvent('wheel', {
    deltaMode: 0,
    deltaY: 100_000,
  } as unknown as string)

  await expect(beforePane).toContainText('bottom change before')
  await expect(afterPane).toContainText('bottom change after')
}
