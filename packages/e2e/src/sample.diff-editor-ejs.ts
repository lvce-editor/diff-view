import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-ejs'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/template-before.ejs`,
    `<!doctype html>
<html>
  <body>
    <h1><%= title %></h1>
    <p>Left</p>
  </body>
</html>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/template-after.ejs`,
    `<!doctype html>
<html>
  <body>
    <h1><%= title %></h1>
    <p>Right</p>
    <ul>
      <% items.forEach(function(item) { %>
        <li><%= item %></li>
      <% }) %>
    </ul>
  </body>
</html>
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/template-before.ejs`, `${tmpDir}/template-after.ejs`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('<h1><%= title %></h1>')
  await expect(contentLeft).toContainText('<p>Left</p>')
  await expect(contentRight).toContainText('<h1><%= title %></h1>')
  await expect(contentRight).toContainText('<p>Right</p>')
  await expect(contentRight).toContainText('<li><%= item %></li>')
}
