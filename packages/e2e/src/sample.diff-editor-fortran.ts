import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-fortran'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/main-before.f90`,
    `program hello
  implicit none

  print *, 'left'
end program hello
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/main-after.f90`,
    `program hello
  implicit none

  print *, 'right'
end program hello
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/main-before.f90`, `${tmpDir}/main-after.f90`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText("print *, 'left'")
  await expect(contentRight).toContainText("print *, 'right'")
}
