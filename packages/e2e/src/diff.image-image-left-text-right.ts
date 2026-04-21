import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

type LocatorExternal = ReturnType<TestApi['Locator']>

const expectAttribute = async (api: TestApi, locator: LocatorExternal, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const name = 'diff.image-image-left-text-right'

export const skip = 1

export const test: Test = async (api) => {
  const { expect, FileSystem, Locator, Main } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/image-left-text-right.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/right.txt`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/image-left-text-right.png<->${tmpDir}/right.txt`)

  const beforeImage = Locator('.DiffPane--before .ImageElement')
  const afterPane = Locator('.DiffPane--after')

  await expectAttribute(api, beforeImage, 'alt', 'left.png')
  await expectAttribute(api, beforeImage, 'src', /^data:image\/png;base64,/)
  await expect(afterPane).toContainText('const rightValue = 42')
}
