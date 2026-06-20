import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.toggle-whitespace'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.txt`,
    `same
before
shared`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.txt`,
    `same
after
shared`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const whitespaceToggle = Locator('.DiffEditorWhitespaceToggle')
  const activeWhitespaceToggle = Locator('.DiffEditorWhitespaceToggleActive')

  await expect(whitespaceToggle).toBeVisible()
  await expect(activeWhitespaceToggle).toHaveCount(0)

  await Command.execute('DiffView.toggleWhitespace')
  await expect(activeWhitespaceToggle).toHaveCount(1)
}
