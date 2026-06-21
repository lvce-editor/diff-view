import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.merge-conflict-decorators-inline'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = `<<<<<<< HEAD
const value = 'current'
=======
const value = 'incoming'
>>>>>>> feature`

  await FileSystem.writeFile(`${tmpDir}/before.ts`, content)
  await FileSystem.writeFile(`${tmpDir}/after.ts`, content)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.ts`, `${tmpDir}/after.ts`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const rows = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow')
  const gitButtons = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.GitButtons')
  const incomingChange = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.IncomingChange')
  const metaLineNumbers = Locator('.InlineDiffEditor .DiffEditorGutter .DiffEditorLineNumberMeta')

  await expect(rows).toHaveCount(7)
  await expect(gitButtons).toHaveCount(1)
  await expect(gitButtons).toHaveText('Accept current change | Accept incoming change | Accept both')
  await expect(incomingChange).toHaveCount(1)
  await expect(incomingChange).toHaveText('Incoming Change')
  await expect(metaLineNumbers).toHaveCount(2)

  await expect(rows.nth(0)).toHaveText('Accept current change | Accept incoming change | Accept both')
  await expect(rows.nth(1)).toHaveText('  <<<<<<< HEAD')
  await expect(rows.nth(2)).toHaveText("  const value = 'current'")
  await expect(rows.nth(3)).toHaveText('  =======')
  await expect(rows.nth(4)).toHaveText('Incoming Change')
  await expect(rows.nth(5)).toHaveText("  const value = 'incoming'")
  await expect(rows.nth(6)).toHaveText('  >>>>>>> feature')
}
