import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.video-different-formats-valid-both'

export const skip = 1

const mp4DataUriRegex = /^data:video\/mp4;base64,/
const webmDataUriRegex = /^data:video\/webm;base64,/

export const test: Test = async ({ DiffView, expect, FileSystem, Locator }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-different-formats-valid-both.webm`, 'fixture')

  await DiffView.open(`${tmpDir}/left.mp4`, `${tmpDir}/video-different-formats-valid-both.webm`)

  const beforeVideo = Locator('.DiffPane--before .VideoElement')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await expect(beforeVideo).toHaveAttribute('title', 'left.mp4')
  await expect(beforeVideo).toHaveAttribute('src', mp4DataUriRegex as unknown as string)
  await expect(afterVideo).toHaveAttribute('title', 'right.webm')
  await expect(afterVideo).toHaveAttribute('src', webmDataUriRegex as unknown as string)
}
