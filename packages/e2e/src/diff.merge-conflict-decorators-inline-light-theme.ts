import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.merge-conflict-decorators-inline-light-theme'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = `<<<<<<< HEAD
body { color: green; }
=======
body { color: blue; }
>>>>>>> theme-branch`

  await FileSystem.writeFile(`${tmpDir}/before.css`, content)
  await FileSystem.writeFile(`${tmpDir}/after.css`, content)
  await Workspace.setPath(tmpDir)
  await Command.execute('ColorTheme.setColorTheme', 'ayu')

  await DiffView.open(`${tmpDir}/before.css`, `${tmpDir}/after.css`)
  await Command.execute('DiffView.setDiffMode', 'inline')

  const main = Locator('.Main')
  const gitButtons = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.GitButtons')
  const incomingChange = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.IncomingChange')
  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')

  await expect(main).toHaveCSS('background-color', 'rgb(248, 249, 250)')
  await expect(gitButtons).toBeVisible()
  await expect(incomingChange).toBeVisible()
  await expect(inlineRows).toContainText('body { color: green; }')
  await expect(inlineRows).toContainText('body { color: blue; }')
}
