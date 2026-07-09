import type { Test } from '@lvce-editor/test-with-playwright'

type TestContext = Readonly<Parameters<Test>[0]>

const getContent = (lineCount: number): string => {
  if (lineCount === 1) {
    return 'line 1'
  }

  return `${'x\n'.repeat(lineCount - 1)}x`
}

const expectGutterWidth = async ({ DiffView, expect, FileSystem, Locator, Workspace }: TestContext, lineCount: number, expectedWidth: string): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/before-${lineCount}.txt`, '')
  await FileSystem.writeFile(`${tmpDir}/after-${lineCount}.txt`, getContent(lineCount))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before-${lineCount}.txt`, `${tmpDir}/after-${lineCount}.txt`)

  const gutter = Locator('.DiffEditorContentRight .DiffEditorGutter')
  await expect(gutter).toHaveCSS('width', expectedWidth)
}

export const name = 'diff.gutter-width-large-line-numbers'

export const test: Test = async (api) => {
  await expectGutterWidth(api, 1, '37px')
  await expectGutterWidth(api, 10_000, '73px')
  await expectGutterWidth(api, 1_000_000, '91px')
}
