import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.video-text-left-video-right'

export const skip = 1

export const test: Test = async (api) => {
  const { DiffView, FileSystem, Locator } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.txt`, 'fixture')
  await FileSystem.writeFile(`${tmpDir}/video-text-left-video-right.mp4`, 'fixture')

  await DiffView.open(`${tmpDir}/left.txt`, `${tmpDir}/video-text-left-video-right.mp4`)

  const beforePane = Locator('.DiffPane--before')
  const afterVideo = Locator('.DiffPane--after .VideoElement')

  await api.expect(beforePane).toContainText('const leftValue = 42')
  await api.expect(afterVideo).toHaveAttribute('title', 'right.mp4')
  await api.expect(afterVideo).toHaveAttribute('src', /^data:video\/mp4;base64,/ as unknown as string)
}
