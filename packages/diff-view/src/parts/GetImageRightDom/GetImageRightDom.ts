import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDiffEditorButtonsDom } from '../GetDiffEditorButtonsDom/GetDiffEditorButtonsDom.ts'

export const getImageRightDom = (uriRight: string, imageSrc: string, diffMode: DiffMode, showWhitespace: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: `${ClassNames.DiffEditorContent} ${ClassNames.DiffEditorContentRight}`,
      onClick: DomEventListenerFunctions.HandleClickRightSide,
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
    ...getDiffEditorButtonsDom(diffMode, showWhitespace),
  ]
}
