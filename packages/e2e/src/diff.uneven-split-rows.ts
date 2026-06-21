import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.uneven-split-rows'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.tsx`,
    `import * as 'react';
import IconSprite from './IconSprite';
import Header from './Header';

export default function Home() {
  return (
    <div>
      <Header />
      <IconSprite />
    </div>
  );
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.tsx`,
    `import IconSprite from './IconSprite';
import HeaderSimple from '../components/HeaderSimple';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <HeaderSimple />
      <IconSprite />
      <h1>Hello!</h1>
    </div>
  );
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.tsx`, `${tmpDir}/after.tsx`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  const emptyLineNumbers = Locator('.DiffEditorLineNumberEmpty')

  await expect(beforeRows).toContainText("import * as 'react'")
  await expect(beforeRows).toContainText("import Header from './Header'")
  await expect(afterRows).toContainText("import HeaderSimple from '../components/HeaderSimple'")
  await expect(afterRows).toContainText("import Hero from '../components/Hero'")
  await expect(afterRows).toContainText('<h1>Hello!</h1>')
  await expect(deletedRows.first()).toBeVisible()
  await expect(insertedRows.first()).toBeVisible()
  await expect(emptyLineNumbers.first()).toBeVisible()
}
