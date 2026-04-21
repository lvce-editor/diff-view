import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.package-lock-json'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
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

  await Main.openUri(`diff://${tmpDir}/left/package-lock.json<->${tmpDir}/right/package-lock.json`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText('"version": "1.0.0"')
  await expect(afterPane).toContainText('"version": "1.0.1"')
  await expect(Locator('.DiffPane--before .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffPane--after .Token.Numeric')).toHaveCount(1)
}
