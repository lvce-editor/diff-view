import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-png-valid-both'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right.png',
    afterImageSrc: /^data:image\/png;base64,/,
    beforeAlt: 'left.png',
    beforeImageSrc: /^data:image\/png;base64,/,
    fixtureName: 'image-png-valid-both',
  })
}
