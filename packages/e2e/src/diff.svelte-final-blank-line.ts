import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.svelte-final-blank-line'


export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.js`,
    `\tconst is_single_element = trimmed.length === 1 && trimmed[0].type === 'RegularElement';
\tconst is_single_child_not_needing_template =
\t\ttrimmed.length === 1 &&
\t\t(trimmed[0].type === 'SvelteFragment' ||
\t\t\ttrimmed[0].type === 'TitleElement' ||
\t\t\t(trimmed[0].type === 'IfBlock' && trimmed[0].elseif));

\tconst template_name = context.state.scope.root.unique('root'); // TODO infer name from parent
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.js`,
    `\tconst is_single_element = trimmed.length === 1 && trimmed[0].type === 'RegularElement';
\tconst is_single_child_not_needing_template =
\t\ttrimmed.length === 1 &&
\t\t(trimmed[0].type === 'SvelteFragment' || trimmed[0].type === 'TitleElement');

\tconst template_name = context.state.scope.root.unique('root'); // TODO infer name from parent
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.js`, `${tmpDir}/after.js`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText(`trimmed[0].type === 'IfBlock' && trimmed[0].elseif`)
  await expect(afterRows).toContainText(`trimmed[0].type === 'SvelteFragment' || trimmed[0].type === 'TitleElement'`)
  await expect(deletedRows).toHaveCount(3)
  await expect(insertedRows).toHaveCount(1)
}
