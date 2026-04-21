import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-jpg-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { Command, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'image-jpg-valid-both')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterImage = Locator('.DiffPane--after .ImageElement')

  await expectAttribute(api, beforeImage, 'alt', 'left.jpg')
  await expectAttribute(api, beforeImage, 'src', /^data:image\/jpeg;base64,/)
  await expectAttribute(api, afterImage, 'alt', 'right.jpg')
  await expectAttribute(api, afterImage, 'src', /^data:image\/jpeg;base64,/)
}
