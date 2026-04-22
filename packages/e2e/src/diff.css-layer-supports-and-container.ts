import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.css-layer-supports-and-container'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.css`,
    `@layer base {
  .card {
    padding: 12px;
    color: #222;
  }
}

@supports (display: grid) {
  .layout {
    display: grid;
    gap: 16px;
  }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.css`,
    `@layer base {
  .card {
    padding: 16px;
    color: #111;
    background: #fff;
  }
}

@supports (display: grid) {
  .layout {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container (min-width: 640px) {
  .layout {
    gap: 32px;
  }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .DiffRow--deleted')
  const insertedRows = Locator('.DiffEditorContentRight .DiffRow--inserted')

  await expect(beforePane).toContainText('@supports (display: grid)')
  await expect(beforePane).toContainText('padding: 12px')
  await expect(beforePane).toContainText('gap: 16px')
  await expect(afterPane).toContainText('padding: 16px')
  await expect(afterPane).toContainText('background: #fff')
  await expect(afterPane).toContainText('grid-template-columns: repeat(2, minmax(0, 1fr))')
  await expect(afterPane).toContainText('@container (min-width: 640px)')
  await expect(deletedRows).toHaveCount(3)
  await expect(insertedRows).toHaveCount(9)
}
