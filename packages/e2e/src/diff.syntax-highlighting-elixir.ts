import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-elixir'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.ex`,
    `defmodule Greeter do
  def answer do
    1
  end
end
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.ex`,
    `defmodule Greeter do
  def answer do
    2
  end
end
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.ex`, `${tmpDir}/right.ex`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('defmodule Greeter do')
  await expect(afterPane).toContainText('defmodule Greeter do')
  await expect(beforePane).toContainText('1')
  await expect(afterPane).toContainText('2')
  await expect(Locator('.DiffEditorContentLeft .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Keyword')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentLeft .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Numeric')).toHaveCount(1)
}
