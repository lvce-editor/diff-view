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

  const gitButtonsRow = rows.nth(0)
  const currentMarkerRow = rows.nth(1)
  const currentValueRow = rows.nth(2)
  const separatorRow = rows.nth(3)
  const incomingChangeRow = rows.nth(4)
  const incomingValueRow = rows.nth(5)
  const incomingMarkerRow = rows.nth(6)

  await expect(gitButtonsRow).toHaveText('Accept current change | Accept incoming change | Accept both')
  await expect(currentMarkerRow).toHaveText('  <<<<<<< HEAD')
  await expect(currentValueRow).toHaveText("  const value = 'current'")
  await expect(separatorRow).toHaveText('  =======')
  await expect(incomingChangeRow).toHaveText('Incoming Change')
  await expect(incomingValueRow).toHaveText("  const value = 'incoming'")
  await expect(incomingMarkerRow).toHaveText('  >>>>>>> feature')
}
