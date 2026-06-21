import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

export const name = 'diff.video-invalid-both'

export const skip = 1

const expectText = async (expect: TestApi['expect'], locator: LocatorExternal, value: string): Promise<void> => {
  const locatorExpect = expect(locator) as unknown as {
    toHaveText(expected: string): Promise<void>
  }
  await locatorExpect.toHaveText(value)
}

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-invalid.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-invalid-both.webm`, 'fixture')

  await DiffView.open(`${tmpDir}/left-invalid.mp4`, `${tmpDir}/video-invalid-both.webm`)

  const beforeError = Locator('.DiffPane--before .VideoErrorMessage')
  const afterError = Locator('.DiffPane--after .VideoErrorMessage')

  await expectText(expect, beforeError, 'Failed to load video: left-invalid.mp4')
  await expectText(expect, afterError, 'Failed to load video: right-invalid.webm')
}
