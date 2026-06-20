import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.large-typescript-renderer'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const fixtureUrl = import.meta.resolve('../fixtures/large-typescript-renderer')
  const tmpDir = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.ts`, `${tmpDir}/after.ts`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText('deletionDecorations: DiffDecorationItem[] | undefined')
  await expect(afterRows).toContainText("import { type ChangeObject, diffWordsWithSpace } from 'diff'")
  await expect(deletedRows).toHaveCount(164)
  await expect(insertedRows).toHaveCount(328)
}
