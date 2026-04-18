import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-avif-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.avif',
    afterImageSrc: /^data:image\/avif;base64,/,
    beforeAlt: 'left.avif',
    beforeImageSrc: /^data:image\/avif;base64,/,
    fixtureName: 'image-avif-valid-both',
  })
}
