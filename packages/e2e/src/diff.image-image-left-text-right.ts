import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-image-left-text-right'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterText: 'const rightValue = 42',
    beforeAlt: 'left.png',
    beforeImageSrc: /^data:image\/png;base64,/,
    fixtureName: 'image-left-text-right',
  })
}
