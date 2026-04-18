import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'

export const getDiffEditorVirtualDom = ({
  contentLeft,
  contentRight,
  errorLeftMessage,
  errorLeftStack,
  errorRightMessage,
  errorRightStack,
<<<<<<< HEAD
  lineNumbers,
=======
  layout,
>>>>>>> origin/main
  renderModeLeft,
  renderModeRight,
  uriLeft,
  uriRight,
}: Pick<
  DiffViewState,
  | 'contentLeft'
  | 'contentRight'
  | 'errorLeftMessage'
  | 'errorLeftStack'
  | 'errorRightMessage'
  | 'errorRightStack'
<<<<<<< HEAD
  | 'lineNumbers'
=======
  | 'layout'
>>>>>>> origin/main
  | 'renderModeLeft'
  | 'renderModeRight'
  | 'uriLeft'
  | 'uriRight'
>): readonly VirtualDomNode[] => {
<<<<<<< HEAD
  const showLineNumbers = lineNumbers && renderModeLeft === 'text' && renderModeRight === 'text'
=======
  const diffEditorLayoutClass = layout === 'vertical' ? ClassNames.DiffEditorVertical : ClassNames.DiffEditorHorizontal
  const sashLayoutClass = layout === 'vertical' ? ClassNames.SashHorizontal : ClassNames.SashVertical
>>>>>>> origin/main
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass}`,
      type: VirtualDomElements.Div,
    },
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack, showLineNumbers)),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${sashLayoutClass}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, errorRightMessage, errorRightStack, showLineNumbers)),
  ]
  return dom
}
