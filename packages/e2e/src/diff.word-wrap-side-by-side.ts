import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.word-wrap-side-by-side'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const longLine = 'side by side word wrap content '.repeat(40)

  await FileSystem.writeFile(`${tmpDir}/before.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/after.txt`, longLine)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setWordWrap', true)

  const insertedRow = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(insertedRow).toBeVisible()
  await expect(insertedRow).toHaveText(longLine)
}
