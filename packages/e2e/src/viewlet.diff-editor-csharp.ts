import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-csharp'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.cs`,
    `using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("left");
    }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.cs`,
    `using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("right");
    }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.cs`, `${tmpDir}/right.cs`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('Console.WriteLine("left")')
  await expect(contentRight).toContainText('Console.WriteLine("right")')
}
