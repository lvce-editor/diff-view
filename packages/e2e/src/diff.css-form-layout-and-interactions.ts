import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-form-layout-and-interactions'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #202020;
}

.form input::placeholder {
  color: #888;
}

.form button:hover {
  background: #2b2b2b;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `.form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  color: #111;
}

.form input::placeholder {
  color: #555;
  opacity: 1;
}

.form button:hover,
.form button:focus-visible {
  background: #111;
  outline: 2px solid #fff;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText('display: flex')
  await expect(beforePane).toContainText('flex-direction: column')
  await expect(beforePane).toContainText('.form button:hover')
  await expect(afterPane).toContainText('display: grid')
  await expect(afterPane).toContainText('grid-template-columns: 1fr 2fr')
  await expect(afterPane).toContainText('.form button:focus-visible')
  await expect(afterPane).toContainText('outline: 2px solid #fff')
  await expect(deletedRows).toHaveCount(11)
  await expect(insertedRows).toHaveCount(14)
}
