import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.read-error-both'

export const skip = 1

const errorMessage = 'Failed to execute file system provider: no file system provider for protocol "memfs" found'

export const test: Test = async ({ expect, FileSystem, Locator, Main }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/read-error-both.txt`, 'fixture')

  await Main.openUri(`diff://${tmpDir}/left.txt<->${tmpDir}/read-error-both.txt`)

  const beforeError = Locator('.DiffPane--before .DiffErrorMessage')
  const afterError = Locator('.DiffPane--after .DiffErrorMessage')
  const errorStacks = Locator('.DiffErrorStack')

  await expect(beforeError).toHaveText(errorMessage)
  await expect(afterError).toHaveText(errorMessage)
  await expect(errorStacks).toHaveCount(2)
}
