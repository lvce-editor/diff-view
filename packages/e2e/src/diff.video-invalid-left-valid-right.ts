import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.video-invalid-left-valid-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-invalid.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-invalid-left-valid-right.mp4`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left-invalid.mp4<->${tmpDir}/video-invalid-left-valid-right.mp4`)

  const beforePane = Locator('.DiffPane--before')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await expect(beforePane).toContainText('Failed to load video: left-invalid.mp4')
  await expectAttribute(api, afterVideo, 'title', 'right-valid.mp4')
  await expectAttribute(api, afterVideo, 'src', /^data:video\/mp4;base64,/)
}
