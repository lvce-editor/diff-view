import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.media-fallback-missing-invalid'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, expect, FileSystem, Locator, Workspace } = api
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  await FileSystem.writeFile(`${tmpDir}/right.svg`, '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>')
  await DiffView.open(`${tmpDir}/missing-left.svg`, `${tmpDir}/right.svg`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')
  const afterImage = Locator('.DiffPane--after .ImageElement')
  await expect(beforePane).toContainText('Failed to load image')
  await api.expect(afterImage).toHaveAttribute('src', /^data:image\/svg\+xml;/ as unknown as string)

  await FileSystem.writeFile(`${tmpDir}/left-invalid.mp4`, 'not a video')
  await DiffView.open(`${tmpDir}/left-invalid.mp4`, `${tmpDir}/missing-right.mp4`)

  await expect(beforePane).toContainText('Failed to load video')
  await expect(afterPane).toContainText('Failed to load video')
}
