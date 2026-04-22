import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.zig-complex-refactor'

export const skip = 0

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/main-before.zig`,
    `const std = @import("std");

const Config = struct {
    retries: u8 = 3,
    timeout_ms: u32 = 1_000,
};

fn parsePort(value: []const u8) !u16 {
    return try std.fmt.parseInt(u16, value, 10);
}

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();

    const allocator = arena.allocator();
    const port = try parsePort("8080");
    std.debug.print("port={d}\\n", .{port});
    _ = allocator;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/main-after.zig`,
    `const std = @import("std");

const Config = struct {
    retries: u8 = 5,
    timeout_ms: u32 = 2_500,
    host: []const u8 = "127.0.0.1",
};

fn parsePort(value: []const u8) !u16 {
    return try std.fmt.parseInt(u16, value, 10);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();

    const allocator = gpa.allocator();
    const config = Config{};
    const port = try parsePort("8080");
    std.debug.print("{s}:{d}\\n", .{ config.host, port });
    _ = allocator;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/main-before.zig`, `${tmpDir}/main-after.zig`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffPane--before .DiffRow--deleted')
  const insertedRows = Locator('.DiffPane--after .DiffRow--inserted')

  await expect(beforePane).toContainText('var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);')
  await expect(beforePane).toContainText('std.debug.print("port={d}\\\\n", .{port});')
  await expect(beforePane).not.toContainText('host: []const u8 = "127.0.0.1",')
  await expect(afterPane).toContainText('host: []const u8 = "127.0.0.1",')
  await expect(afterPane).toContainText('var gpa = std.heap.GeneralPurposeAllocator(.{}){};')
  await expect(afterPane).toContainText('const config = Config{};')
  await expect(afterPane).toContainText('std.debug.print("{s}:{d}\\\\n", .{ config.host, port });')
  await expect(afterPane).not.toContainText('arena.deinit')
  await expect(deletedRows).toHaveCount(6)
  await expect(insertedRows).toHaveCount(8)
}
