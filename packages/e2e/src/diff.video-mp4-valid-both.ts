import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.video-mp4-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.mp4`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-mp4-valid-both.mp4`, 'fixture')

  await DiffView.open(`${tmpDir}/left.mp4`, `${tmpDir}/video-mp4-valid-both.mp4`)

  const beforeVideo = Locator('.DiffPane--before .VideoElement')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await api.expect(beforeVideo).toHaveAttribute('title', 'left.mp4')
  await api.expect(beforeVideo).toHaveAttribute('src', /^data:video\/mp4;base64,/ as unknown as string)
  await api.expect(afterVideo).toHaveAttribute('title', 'right.mp4')
  await api.expect(afterVideo).toHaveAttribute('src', /^data:video\/mp4;base64,/ as unknown as string)
}
