import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-css'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.css`,
    `.button {
  color: red;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.css`,
    `.button {
  color: blue;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.css`, `${tmpDir}/right.css`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('.button')
  await expect(contentLeft).toContainText('color: red')
  await expect(contentRight).toContainText('.button')
  await expect(contentRight).toContainText('color: blue')
  // await expect(contentLeft.locator('.Token.CssSelectorClass')).toHaveCount(1)
  // await expect(contentRight.locator('.Token.CssSelectorClass')).toHaveCount(1)
  // await expect(contentLeft.locator('.Token.CssPropertyName')).toHaveCount(1)
  // await expect(contentRight.locator('.Token.CssPropertyName')).toHaveCount(1)
  // await expect(contentLeft.locator('.Token.CssPropertyValue')).toHaveCount(1)
  // await expect(contentRight.locator('.Token.CssPropertyValue')).toHaveCount(1)
}
