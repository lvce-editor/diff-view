import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.coverage-whitespace-toggle-roundtrip'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before.txt`, 'before value')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, 'after value')
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const activeToggle = Locator('.DiffEditorWhitespaceToggleActive')
  await expect(activeToggle).toHaveCount(0)
  await Command.execute('DiffView.toggleWhitespace')
  await expect(activeToggle).toHaveCount(1)
  await Command.execute('DiffView.toggleWhitespace')
  await expect(activeToggle).toHaveCount(0)
}
