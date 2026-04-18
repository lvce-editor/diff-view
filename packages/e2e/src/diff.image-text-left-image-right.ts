import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-text-left-image-right'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.png',
    afterImageSrc: /^data:image\/png;base64,/,
    beforeText: 'const leftValue = 42',
    fixtureName: 'image-text-left-image-right',
  })
}
