import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.trailing-newline-combinations'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/before-with-newline.txt`, 'alpha\n')
  await FileSystem.writeFile(`${tmpDir}/after-without-newline.txt`, 'alpha')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before-with-newline.txt`, `${tmpDir}/after-without-newline.txt`)

  const leftRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(leftRows).toContainText('alpha')
  await expect(rightRows).toContainText('alpha')

  await FileSystem.writeFile(`${tmpDir}/before-without-newline.txt`, 'beta')
  await FileSystem.writeFile(`${tmpDir}/after-with-newline.txt`, 'beta\n')

  await DiffView.open(`${tmpDir}/before-without-newline.txt`, `${tmpDir}/after-with-newline.txt`)

  await expect(leftRows).toContainText('beta')
  await expect(rightRows).toContainText('beta')

  await FileSystem.writeFile(`${tmpDir}/before-both-without-newline.txt`, 'gamma')
  await FileSystem.writeFile(`${tmpDir}/after-both-without-newline.txt`, 'gamma')

  await DiffView.open(`${tmpDir}/before-both-without-newline.txt`, `${tmpDir}/after-both-without-newline.txt`)

  await expect(leftRows).toContainText('gamma')
  await expect(rightRows).toContainText('gamma')
}
