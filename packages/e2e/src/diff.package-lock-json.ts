import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.package-lock-json'

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

  await expect(beforePane).toContainText('"version": "1.0.0"')
  await expect(afterPane).toContainText('"version": "1.0.1"')
  const expectedLocator0 = Locator('.DiffEditorContentLeft .Token.Numeric')
  await expect(expectedLocator0).toHaveCount(1)
  const expectedLocator1 = Locator('.DiffEditorContentRight .Token.Numeric')
  await expect(expectedLocator1).toHaveCount(1)
}
