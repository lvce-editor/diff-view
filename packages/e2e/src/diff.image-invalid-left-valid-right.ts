import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-invalid-left-valid-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-invalid.svg`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-invalid-left-valid-right.svg`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left-invalid.svg<->${tmpDir}/image-invalid-left-valid-right.svg`)

  const beforePane = Locator('.DiffPane--before')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expect(beforePane).toContainText('Failed to load image: left-invalid.svg')
  await expectAttribute(api, afterImage, 'alt', 'right-valid.svg')
  await expectAttribute(api, afterImage, 'src', /^data:image\/svg\+xml;/)
}
