import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-perl'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/script-before.pl`,
    `use strict;
use warnings;

my $value = 'left';
print "$value\n";
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/script-after.pl`,
    `use strict;
use warnings;

my $value = 'right';
print "$value\n";
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/script-before.pl`, `${tmpDir}/script-after.pl`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText("my $value = 'left';")
  await expect(contentRight).toContainText("my $value = 'right';")
}
