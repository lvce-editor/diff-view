import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.html-partial-hunk'


export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.html`,
    `</head>
<body>
<header>
  <h1>Welcome</h1>
  <p>Thanks for visiting</p>
</header>
<footer>
  <p>&copy; Acme Inc.</p>`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.html`,
    `</head>
<body>
<header>
  <h1>Welcome to Our Site</h1>
  <p>We're glad you're here</p>
  <a href="/about" class="btn">Learn More</a>
</header>
<footer>
  <p>&copy; Acme Inc.</p>`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.html`, `${tmpDir}/after.html`)

  const beforeRows = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterRows = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforeRows).toContainText('<h1>Welcome</h1>')
  await expect(beforeRows).toContainText('<p>Thanks for visiting</p>')
  await expect(afterRows).toContainText('<h1>Welcome to Our Site</h1>')
  await expect(afterRows).toContainText("<p>We're glad you're here</p>")
  await expect(afterRows).toContainText('<a href="/about" class="btn">Learn More</a>')
  await expect(deletedRows).toHaveCount(2)
  await expect(insertedRows).toHaveCount(3)
}
