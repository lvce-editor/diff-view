import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.partial-emoji-keycap'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `key: 1️⃣`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `key: 2️⃣`)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.txt`, `${tmpDir}/file-2.txt`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const beforeChanged = Locator('.DiffEditorContentLeft .DiffToken--changed')
  const afterChanged = Locator('.DiffEditorContentRight .DiffToken--changed')

  await expect(beforePane).toContainText('key: 1️⃣')
  await expect(afterPane).toContainText('key: 2️⃣')
  await expect(beforeChanged.first()).toBeVisible()
  await expect(afterChanged.first()).toBeVisible()
}
