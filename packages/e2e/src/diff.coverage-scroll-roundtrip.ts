import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-scroll-roundtrip'

const getContent = (): string => {
  return Array.from({ length: 80 }, (_, index) => `line ${index + 1}`).join('\n')
}

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = getContent()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, content)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, content)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const rightRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(rightRows).toContainText('line 1')
  await Command.execute('DiffView.handleWheel', 0, 9999)
  await expect(rightRows).toContainText('line 80')
  await Command.execute('DiffView.handleWheel', 0, -9999)
  await expect(rightRows).toContainText('line 1')
}
