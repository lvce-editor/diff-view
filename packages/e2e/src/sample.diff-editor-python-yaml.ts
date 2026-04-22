import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-python-yaml'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/script.py`,
    `def main():
    value = 1
    print(value)


if __name__ == '__main__':
    main()
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/config.yaml`,
    `name: right
enabled: true
count: 2
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/script.py`, `${tmpDir}/config.yaml`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('def main():')
  await expect(contentLeft).toContainText("if __name__ == '__main__':")
  await expect(contentRight).toContainText('name: right')
  await expect(contentRight).toContainText('count: 2')
}
