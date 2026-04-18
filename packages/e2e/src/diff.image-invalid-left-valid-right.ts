import type { Test } from '@lvce-editor/test-with-playwright'
import { runImageFixtureTest } from './parts/RunImageFixtureTest/RunImageFixtureTest.ts'

export const name = 'diff.image-invalid-left-valid-right'

export const skip = 1

export const test: Test = async (api) => {
  await runImageFixtureTest(api, {
    afterAlt: 'right-valid.svg',
    afterImageSrc: /^data:image\/svg\+xml;/,
    beforeErrorMessage: 'Failed to load image: left-invalid.svg',
    fixtureName: 'image-invalid-left-valid-right',
  })
}
