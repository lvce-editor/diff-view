import type { Test } from '@lvce-editor/test-with-playwright'

const getAddedContent = (): string => {
  let content = ''
  for (let lineNumber = 1; lineNumber <= 63; lineNumber++) {
    content += `added line ${lineNumber}\n`
  }
  return content
}

export const name = 'diff.many-lines-added'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const addedContent = getAddedContent()

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, ``)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, addedContent)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane.locator('.DiffEditorRows')).toHaveText('')
  await expect(Locator('.ScrollBar')).toHaveCount(1)
  await expect(afterPane).toContainText('added line 1')

  await Command.execute('DiffView.handleWheel', 0, 9999)

  await expect(afterPane).toContainText('added line 63')
}
