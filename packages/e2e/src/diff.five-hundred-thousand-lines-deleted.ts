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
  const expectedLocator0 = Locator('.DiffScrollBar')
  await expect(expectedLocator0).toHaveCount(1)
}
