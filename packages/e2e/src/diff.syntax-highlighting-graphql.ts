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
  const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  const typeTokensLeft = Locator('.DiffEditorContentLeft .Token.Type')
  const typeTokensRight = Locator('.DiffEditorContentRight .Token.Type')
  const variableNameTokensLeft = Locator('.DiffEditorContentLeft .Token.VariableName')
  const variableNameTokensRight = Locator('.DiffEditorContentRight .Token.VariableName')

  await expect(beforePane).toContainText('age: Int')
  await expect(afterPane).toContainText('age: Float')
  await expect(keywordTokensLeft).toHaveCount(2)
  await expect(keywordTokensRight).toHaveCount(2)
  await expect(typeTokensLeft).toHaveCount(7)
  await expect(typeTokensRight).toHaveCount(7)
  await expect(variableNameTokensLeft).toHaveCount(5)
  await expect(variableNameTokensRight).toHaveCount(5)
}
