import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-jpg-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.jpg',
    afterImageSrc: /^data:image\/jpeg;base64,/,
    beforeAlt: 'left.jpg',
    beforeImageSrc: /^data:image\/jpeg;base64,/,
    fixtureName: 'image-jpg-valid-both',
  })
}
