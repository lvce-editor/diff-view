import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.image-image-left-text-right'

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/image-left-text-right.png`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/image-left-text-right.txt`, 'const rightValue = 42')

  await DiffView.open(`${tmpDir}/image-left-text-right.png`, `${tmpDir}/image-left-text-right.txt`)

  const beforeImage = Locator('.DiffEditorContentLeft .ImageElement')

  await api.expect(beforeImage).toBeVisible()
  await api.expect(beforeImage).toHaveAttribute('alt', `${tmpDir}/image-left-text-right.png`)
  await DiffView.shouldHaveContentRight('const rightValue = 42')
}
