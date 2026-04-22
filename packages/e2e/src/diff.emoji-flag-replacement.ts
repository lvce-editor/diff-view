import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.emoji-flag-replacement'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `locale: 🇩🇪`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `locale: 🇺🇸`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeChanged = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const afterChanged = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(beforePane).toContainText('locale: 🇩🇪')
  await expect(afterPane).toContainText('locale: 🇺🇸')
  await expect(beforeChanged.first()).toBeVisible()
  await expect(afterChanged.first()).toBeVisible()
}
