import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.video-different-formats-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-different-formats-valid-both.webm`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.mp4<->${tmpDir}/video-different-formats-valid-both.webm`)

  const beforeVideo = Locator('.DiffPane--before .VideoElement')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await expectAttribute(api, beforeVideo, 'title', 'left.mp4')
  await expectAttribute(api, beforeVideo, 'src', /^data:video\/mp4;base64,/)
  await expectAttribute(api, afterVideo, 'title', 'right.webm')
  await expectAttribute(api, afterVideo, 'src', /^data:video\/webm;base64,/)
}
