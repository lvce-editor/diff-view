import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-text-left-image-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-text-left-image-right.png`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.txt<->${tmpDir}/image-text-left-image-right.png`)

  const beforePane = Locator('.DiffPane--before')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expect(beforePane).toContainText('const leftValue = 42')
  await expectAttribute(api, afterImage, 'alt', 'right.png')
  await expectAttribute(api, afterImage, 'src', /^data:image\/png;base64,/)
}
