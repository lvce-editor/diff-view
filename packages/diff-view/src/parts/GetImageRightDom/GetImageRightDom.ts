import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

export const getImageRightDom = (uriRight: string, imageSrc: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.DiffEditorContent, ClassNames.DiffEditorContentRight),
      onClick: DomEventListenerFunctions.HandleClickRightSide,
      role: AriaRoles.Presentation,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ImageContent,
      type: VirtualDomElements.Div,
    },
    {
      alt: uriRight,
      childCount: 0,
      className: ClassNames.ImageElement,
      src: imageSrc,
      type: VirtualDomElements.Img,
    },
  ]
}
