import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-webp-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.webp',
    afterImageSrc: /^data:image\/webp;base64,/,
    beforeAlt: 'left.webp',
    beforeImageSrc: /^data:image\/webp;base64,/,
    fixtureName: 'image-webp-valid-both',
  })
}
