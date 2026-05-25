import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.package-lock-json'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left/package-lock.json`,
    `{
  "name": "demo-app",
  "lockfileVersion": 3,
  "packages": {
    "": {
      "name": "demo-app",
      "version": "1.0.0"
    }
  }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right/package-lock.json`,
    `{
  "name": "demo-app",
  "lockfileVersion": 3,
  "packages": {
    "": {
      "name": "demo-app",
      "version": "1.0.1"
    }
  }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left/package-lock.json`, `${tmpDir}/right/package-lock.json`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')

  await expect(beforePane).toContainText('"version": "1.0.0"')
  await expect(afterPane).toContainText('"version": "1.0.1"')
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
}
