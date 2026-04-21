import type { Test } from '@lvce-editor/test-with-playwright'

const getDeletedContent = (): string => {
  let content = ''

  for (let lineNumber = 1; lineNumber <= 500_000; lineNumber++) {
    content += `deleted line ${lineNumber}`

    if (lineNumber < 500_000) {
      content += '\n'
    }
  }

  return content
}

export const name = 'diff.five-hundred-thousand-lines-deleted'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getDeletedContent())
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, ``)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforeRows).toBeVisible()
  await expect(beforeRows).toContainText('deleted line 1')
  await expect(afterRows).toHaveText('')
  await expect(Locator('.ScrollBar')).toHaveCount(1)
}
