import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.video-invalid-left-valid-right'

export const skip = 1

const mp4DataUriRegex = /^data:video\/mp4;base64,/

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left-invalid.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-invalid-left-valid-right.mp4`, 'fixture')

  await DiffView.open(`${tmpDir}/left-invalid.mp4`, `${tmpDir}/video-invalid-left-valid-right.mp4`)

  const beforePane = Locator('.DiffPane--before')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await expect(beforePane).toContainText('Failed to load video: left-invalid.mp4')
  await expect(afterVideo).toHaveAttribute('title', 'right-valid.mp4')
  await expect(afterVideo).toHaveAttribute('src', mp4DataUriRegex as unknown as string)
}
