import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-text-left-image-right'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'const leftValue = 42')
  await FileSystem.writeFile(`${tmpDir}/image-text-left-image-right.png`, 'fixture')

  await DiffView.open(`${tmpDir}/left.txt`, `${tmpDir}/image-text-left-image-right.png`)

  const afterImage = Locator('.DiffEditorContentRight .ImageElement')

  await DiffView.shouldHaveContentLeft('const leftValue = 42')
  await api.expect(afterImage).toBeVisible()
  await api.expect(afterImage).toHaveAttribute('alt', `${tmpDir}/image-text-left-image-right.png`)
}
