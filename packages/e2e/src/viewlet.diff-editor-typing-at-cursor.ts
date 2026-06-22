import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.diff-editor-typing-at-cursor'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'hello')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'helloWorld')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const input = Locator('.DiffEditorInput')

  await expect(input).toHaveCount(1)
  // place caret between 'hello' and 'World'
  await Command.execute('DiffView.handleInput', ' ')

  await expect(input).toHaveValue(' ')
  await expect(afterRows).toHaveText('hello World')
}
