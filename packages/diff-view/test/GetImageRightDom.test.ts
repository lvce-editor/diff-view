import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getImageRightDom } from '../src/parts/GetImageRightDom/GetImageRightDom.ts'

test('getImageRightDom renders an image element', (): void => {
  const result = getImageRightDom('/tmp/image.png', 'blob:image-data')
  expect(result).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
      role: 'presentation',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ImageContent,
      type: VirtualDomElements.Div,
    },
    {
      alt: '/tmp/image.png',
      childCount: 0,
      className: ClassNames.ImageElement,
      src: 'blob:image-data',
      type: VirtualDomElements.Img,
    },
  ])
})
