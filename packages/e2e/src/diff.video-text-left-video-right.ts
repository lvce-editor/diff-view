import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.video-text-left-video-right'

export const skip = 1

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-text-left-video-right.mp4`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.txt<->${tmpDir}/video-text-left-video-right.mp4`)

  const beforePane = Locator('.DiffPane--before')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await api.expect(beforePane).toContainText('const leftValue = 42')
  await expectAttribute(api, afterVideo, 'title', 'right.mp4')
  await expectAttribute(api, afterVideo, 'src', /^data:video\/mp4;base64,/)
}
