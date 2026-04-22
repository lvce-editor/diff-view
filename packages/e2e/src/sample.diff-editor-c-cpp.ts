import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-c-cpp'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/buffer.c`,
    `#include <stdio.h>

int main() {
    int value = 1;
    printf("%d\n", value);
    return 0;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/buffer.cpp`,
    `#include <iostream>

int main() {
    int value = 2;
    std::cout << value << std::endl;
    return 0;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/buffer.c`, `${tmpDir}/buffer.cpp`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('#include <stdio.h>')
  await expect(contentLeft).toContainText('printf("%d\\n", value);')
  await expect(contentRight).toContainText('#include <iostream>')
  await expect(contentRight).toContainText('std::cout << value << std::endl;')
}
