import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-graphql'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
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

  await Main.openUri(`diff://${tmpDir}/left.graphql<->${tmpDir}/right.graphql`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('age: Int')
  await expect(afterPane).toContainText('age: Float')
  await expect(Locator('.DiffEditorContentLeft .Token.Keyword')).toHaveCount(2)
  await expect(Locator('.DiffEditorContentRight .Token.Keyword')).toHaveCount(2)
  await expect(Locator('.DiffEditorContentLeft .Token.Type')).toHaveCount(7)
  await expect(Locator('.DiffEditorContentRight .Token.Type')).toHaveCount(7)
  await expect(Locator('.DiffEditorContentLeft .Token.VariableName')).toHaveCount(5)
  await expect(Locator('.DiffEditorContentRight .Token.VariableName')).toHaveCount(5)
}
