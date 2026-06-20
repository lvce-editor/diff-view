import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.line-endings'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before-crlf.txt`, 'alpha\r\nbeta\r\ngamma\r\n')
  await FileSystem.writeFile(`${tmpDir}/after-lf.txt`, 'alpha\nbeta changed\ngamma\n')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before-crlf.txt`, `${tmpDir}/after-lf.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toContainText('beta')
  await expect(rightRows).toContainText('beta changed')

  await FileSystem.writeFile(`${tmpDir}/before-mixed.txt`, 'one\r\ntwo\nthree\r\n')
  await FileSystem.writeFile(`${tmpDir}/after-mixed.txt`, 'one\r\ntwo changed\nthree\r\n')

  await DiffView.open(`${tmpDir}/before-mixed.txt`, `${tmpDir}/after-mixed.txt`)

  await expect(leftRows).toContainText('two')
  await expect(rightRows).toContainText('two changed')
}
