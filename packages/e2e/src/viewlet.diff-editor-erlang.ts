import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-erlang'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/hello-before.erl`,
    `-module(hello).
-export([greet/0]).

greet() ->
    hello.
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/hello-after.erl`,
    `-module(hello).
-export([greet/0]).

greet() ->
    world.
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/hello-before.erl`, `${tmpDir}/hello-after.erl`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('-module(hello).')
  await expect(contentLeft).toContainText('hello.')
  await expect(contentRight).toContainText('-module(hello).')
  await expect(contentRight).toContainText('world.')
}
