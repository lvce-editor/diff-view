import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.bun-lock-valid-both'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left/bun.lock`,
    `version: 1
packages:
  left: true
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right/bun.lock`,
    `version: 1
packages:
  right: true
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left/bun.lock`, `${tmpDir}/right/bun.lock`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('version: 1')
  await expect(beforePane).toContainText('left: true')
  await expect(afterPane).toContainText('version: 1')
  await expect(afterPane).toContainText('right: true')
}
