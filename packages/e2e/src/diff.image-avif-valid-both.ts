import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-avif-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.avif`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-avif-valid-both.avif`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.avif<->${tmpDir}/image-avif-valid-both.avif`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expectAttribute(api, beforeImage, 'alt', 'left.avif')
  await expectAttribute(api, beforeImage, 'src', /^data:image\/avif;base64,/)
  await expectAttribute(api, afterImage, 'alt', 'right.avif')
  await expectAttribute(api, afterImage, 'src', /^data:image\/avif;base64,/)
}
