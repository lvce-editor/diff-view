import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-png-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-png-valid-both.png`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.png<->${tmpDir}/image-png-valid-both.png`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expectAttribute(api, beforeImage, 'alt', 'left.png')
  await expectAttribute(api, beforeImage, 'src', /^data:image\/png;base64,/)
  await expectAttribute(api, afterImage, 'alt', 'right.png')
  await expectAttribute(api, afterImage, 'src', /^data:image\/png;base64,/)
}
