import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-lua-ruby'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/script.lua`,
    `local value = 1

function main()
  print(value)
end
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/script.rb`,
    `value = 2

def main
  puts value
end
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/script.lua<->${tmpDir}/script.rb`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('local value = 1')
  await expect(contentLeft).toContainText('function main()')
  await expect(contentRight).toContainText('value = 2')
  await expect(contentRight).toContainText('def main')
}
