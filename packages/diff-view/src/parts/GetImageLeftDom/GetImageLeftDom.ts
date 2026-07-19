import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

export const getImageLeftDom = (uriLeft: string, imageSrc: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.DiffEditorContent, ClassNames.DiffEditorContentLeft),
      onClick: DomEventListenerFunctions.HandleClickLeftSide,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ImageContent,
      type: VirtualDomElements.Div,
    },
    {
      alt: uriLeft,
      childCount: 0,
      className: ClassNames.ImageElement,
      src: imageSrc,
      type: VirtualDomElements.Img,
    },
  ]
}
