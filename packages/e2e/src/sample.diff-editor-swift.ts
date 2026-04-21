import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-swift'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/greeter-before.swift`,
    `import Foundation

struct Greeter {
    let name: String

    func message() -> String {
        return "Hello, \(name)"
    }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/greeter-after.swift`,
    `import Foundation

struct Greeter {
    let name: String

    func message() -> String {
        return "Hi, \(name)"
    }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/greeter-before.swift<->${tmpDir}/greeter-after.swift`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('return "Hello, \\(name)"')
  await expect(contentRight).toContainText('return "Hi, \\(name)"')
}
