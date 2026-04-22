import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-zig'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/main-before.zig`,
    `const std = @import("std");

pub fn main() !void {
    std.debug.print("left\n", .{});
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/main-after.zig`,
    `const std = @import("std");

pub fn main() !void {
    std.debug.print("right\n", .{});
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/main-before.zig<->${tmpDir}/main-after.zig`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('std.debug.print("left\\n", .{});')
  await expect(contentRight).toContainText('std.debug.print("right\\n", .{});')
}
