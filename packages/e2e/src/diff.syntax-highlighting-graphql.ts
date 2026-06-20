import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-graphql'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.graphql`,
    `type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String
  age: Int
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.graphql`,
    `type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String
  age: Float
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.graphql`, `${tmpDir}/right.graphql`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('age: Int')
  await expect(afterPane).toContainText('age: Float')
  const expectedLocator0 = Locator('.DiffEditorContentLeft .Token.Keyword')
  await expect(expectedLocator0).toHaveCount(2)
  const expectedLocator1 = Locator('.DiffEditorContentRight .Token.Keyword')
  await expect(expectedLocator1).toHaveCount(2)
  const expectedLocator2 = Locator('.DiffEditorContentLeft .Token.Type')
  await expect(expectedLocator2).toHaveCount(7)
  const expectedLocator3 = Locator('.DiffEditorContentRight .Token.Type')
  await expect(expectedLocator3).toHaveCount(7)
  const expectedLocator4 = Locator('.DiffEditorContentLeft .Token.VariableName')
  await expect(expectedLocator4).toHaveCount(5)
  const expectedLocator5 = Locator('.DiffEditorContentRight .Token.VariableName')
  await expect(expectedLocator5).toHaveCount(5)
}
