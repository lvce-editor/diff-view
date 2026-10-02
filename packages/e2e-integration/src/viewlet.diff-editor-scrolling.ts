import type { Test } from '@lvce-editor/test-with-playwright'

const getContent = (bottomLine: string): string => {
  const lines: string[] = []
  for (let index = 1; index <= 1800; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push(bottomLine)
  return lines.join('\n')
}

export const name = 'viewlet.diff-editor-scrolling'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getContent('bottom change before'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getContent('bottom change after'))
  await Workspace.setUri(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const line1 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1',
  })
  await expect(line1).toBeVisible()

  const contentRight = Locator('.DiffEditorContentRight')
  await contentRight.dispatchEvent('wheel', {
    bubbles: true,
    deltaMode: 0,
    deltaY: 9_999_999,
  })

  const line1800 = Locator('.DiffEditorContentLeft .DiffEditorLineNumber', {
    hasText: '1800',
  })
  await expect(line1800).toBeVisible()
}
