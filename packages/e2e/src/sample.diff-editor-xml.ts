import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-xml'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/config-before.xml`,
    `<service>
  <name>alpha</name>
  <version>1</version>
</service>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/config-after.xml`,
    `<service>
  <name>alpha</name>
  <version>2</version>
  <enabled>true</enabled>
</service>
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/config-before.xml`, `${tmpDir}/config-after.xml`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('<service>')
  await expect(contentLeft).toContainText('<version>1</version>')
  await expect(contentRight).toContainText('<service>')
  await expect(contentRight).toContainText('<version>2</version>')
  await expect(contentRight).toContainText('<enabled>true</enabled>')
}
