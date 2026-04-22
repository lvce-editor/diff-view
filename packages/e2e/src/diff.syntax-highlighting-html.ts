import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-html'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.html`,
    `<!doctype html>
<html lang="en">
  <body>
    <h1>Left</h1>
    <p>Common</p>
  </body>
</html>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.html`,
    `<!doctype html>
<html lang="en">
  <body>
    <h1>Right</h1>
    <p>Common</p>
  </body>
</html>
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.html`, `${tmpDir}/right.html`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('<html lang="en">')
  await expect(afterPane).toContainText('<html lang="en">')
  await expect(beforePane).toContainText('<h1>Left</h1>')
  await expect(afterPane).toContainText('<h1>Right</h1>')
  await expect(beforePane.locator('.Token.TagName')).toHaveCount(9)
}
