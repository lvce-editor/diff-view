import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-php'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.php`,
    `<?php
$value = 1;
echo "left";
echo $value;
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.php`,
    `<?php
$value = 2;
echo "right";
echo $value;
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/left.php<->${tmpDir}/right.php`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('echo "left";')
  await expect(afterPane).toContainText('echo "right";')
  await expect(beforePane).toContainText('$value = 1;')
  await expect(afterPane).toContainText('$value = 2;')
  await expect(Locator('.DiffEditorContentLeft .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.Numeric')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentLeft .Token.String')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentRight .Token.String')).toHaveCount(1)
  await expect(Locator('.DiffEditorContentLeft .Token.VariableName')).toHaveCount(2)
  await expect(Locator('.DiffEditorContentRight .Token.VariableName')).toHaveCount(2)
}
