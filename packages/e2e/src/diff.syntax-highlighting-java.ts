import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-java'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file-1.java`,
    `public class Greeter {
  public static void main(String[] args) {
    int count = 1;
    if (count > 0) {
      return;
    }
  }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/file-2.java`,
    `public class Greeter {
  public static void main(String[] args) {
    int count = 2;
    if (count > 0) {
      return;
    }
  }
}
`,
  )

  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/file-1.java`, `${tmpDir}/file-2.java`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('int count = 1;')
  await expect(afterPane).toContainText('int count = 2;')
  await expect(beforePane).toContainText('return;')
  await expect(afterPane).toContainText('return;')
  await expect(beforePane.locator('.Token.Keyword')).toHaveCount(5)
  await expect(afterPane.locator('.Token.Keyword')).toHaveCount(5)
}
