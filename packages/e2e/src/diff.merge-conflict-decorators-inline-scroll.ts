import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.merge-conflict-decorators-inline-scroll'

const getContent = (): string => {
  const lines: string[] = []
  for (let index = 1; index <= 900; index++) {
    lines.push(`shared line ${index}`)
  }
  lines.push('<<<<<<< HEAD')
  lines.push('bottom current')
  lines.push('=======')
  lines.push('bottom incoming')
  lines.push('>>>>>>> bottom-branch')
  return lines.join('\n')
}

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = getContent()

  await FileSystem.writeFile(`${tmpDir}/before.txt`, content)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, content)
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)
  await Command.execute('DiffView.setDiffMode', 'inline')
  await Command.execute('DiffView.handleWheel', 9, 9_999_999)

  const inlineRows = Locator('.InlineDiffEditor .DiffEditorRows')
  const gitButtons = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.GitButtons')
  const incomingChange = Locator('.InlineDiffEditor .DiffEditorRows .EditorRow.IncomingChange')

  await expect(gitButtons).toBeVisible()
  await expect(incomingChange).toBeVisible()
  await expect(inlineRows).toContainText('bottom current')
  await expect(inlineRows).toContainText('bottom incoming')
}
