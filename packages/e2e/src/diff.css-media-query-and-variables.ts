import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-media-query-and-variables'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `:root {
  --gap: 8px;
  --accent: #ff6600;
}

.card {
  display: flex;
  gap: var(--gap);
  color: var(--accent);
}

@media (min-width: 960px) {
  .card {
    padding: 16px;
    border-radius: 12px;
  }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `:root {
  --gap: 12px;
  --accent: #0055ff;
  --surface: #f4f7fb;
}

.card {
  display: flex;
  gap: var(--gap);
  color: var(--accent);
  background: var(--surface);
}

@media (min-width: 960px) {
  .card {
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText('--gap: 8px')
  await expect(beforePane).toContainText('--accent: #ff6600')
  await expect(beforePane).toContainText('padding: 16px')
  await expect(afterPane).toContainText('--gap: 12px')
  await expect(afterPane).toContainText('--surface: #f4f7fb')
  await expect(afterPane).toContainText('background: var(--surface)')
  await expect(afterPane).toContainText('box-shadow: 0 8px 24px rgb(0 0 0 / 0.12)')
  await expect(deletedRows).toHaveCount(3)
  await expect(insertedRows).toHaveCount(6)
}
