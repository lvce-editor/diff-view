import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-yaml'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/config-before.yaml`,
    `service:
  name: api
  replicas: 2
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/config-after.yaml`,
    `service:
  name: api
  replicas: 3
  enabled: true
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/config-before.yaml<->${tmpDir}/config-after.yaml`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')

  await expect(contentLeft).toContainText('service:')
  await expect(contentLeft).toContainText('replicas: 2')
  await expect(contentRight).toContainText('service:')
  await expect(contentRight).toContainText('replicas: 3')
  await expect(contentRight).toContainText('enabled: true')
}
