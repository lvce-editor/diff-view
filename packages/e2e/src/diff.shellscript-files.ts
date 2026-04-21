import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.shellscript-files'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.sh`,
    `#!/bin/sh

if true; then
  echo left
fi
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.sh`,
    `#!/bin/sh

if true; then
  echo right
fi
`,
  )

  await Workspace.setPath(tmpDir)
  await Main.openUri(`diff://${tmpDir}/left.sh<->${tmpDir}/right.sh`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText('echo left')
  await expect(afterPane).toContainText('echo right')
  await expect(beforePane.locator('.Token.Keyword')).toHaveCount(3)
  await expect(afterPane.locator('.Token.Keyword')).toHaveCount(3)
}
