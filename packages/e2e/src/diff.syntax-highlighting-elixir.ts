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
  const expectedLocator0 = Locator('.DiffEditorContentLeft .Token.Keyword')
  await expect(expectedLocator0).toHaveCount(1)
  const expectedLocator1 = Locator('.DiffEditorContentRight .Token.Keyword')
  await expect(expectedLocator1).toHaveCount(1)
  const expectedLocator2 = Locator('.DiffEditorContentLeft .Token.Numeric')
  await expect(expectedLocator2).toHaveCount(1)
  const expectedLocator3 = Locator('.DiffEditorContentRight .Token.Numeric')
  await expect(expectedLocator3).toHaveCount(1)
}
