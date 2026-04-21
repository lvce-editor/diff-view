import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const stackLocationRegex = /((?:https?:\/\/|file:\/\/\/?|\/)[^\s)]+):(\d+):(\d+)\)?$/

const getStackLineLink = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return ''
  }
  const [, location] = match
  if (location.startsWith('/')) {
    return `file://${location}`
  }
  return location
}

const getErrorStackLineDom = (stackLine: string): readonly VirtualDomNode[] => {
  const href = getStackLineLink(stackLine)
  if (!href) {
    return [
      {
        childCount: 1,
        type: VirtualDomElements.Div,
      },
      text(stackLine),
    ]
  }
  return [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      href,
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text(stackLine),
  ]
}

export const getErrorStackDom = (errorStack: string): readonly VirtualDomNode[] => {
  if (!errorStack) {
    return []
  }
  const stackLines = errorStack.split('\n')
  return [
    {
      childCount: stackLines.length,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    ...stackLines.flatMap(getErrorStackLineDom),
  ]
}
