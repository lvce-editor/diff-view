import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-svg-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.svg',
    afterImageSrc: /^data:image\/svg\+xml;/,
    beforeAlt: 'left.svg',
    beforeImageSrc: /^data:image\/svg\+xml;/,
    fixtureName: 'image-svg-valid-both',
  })
}
