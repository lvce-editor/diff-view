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

const getStackLineLabel = (href: string): string => {
  if (!href) {
    return ''
  }
  const pathname = href.startsWith('file://') ? href.slice('file://'.length) : href
  const fileName = pathname.slice(pathname.lastIndexOf('/') + 1)
  return `(${fileName})`
}

const getStackLinePrefix = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return stackLine
  }
  return stackLine.slice(0, stackLine.length - match[0].length)
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
  const prefix = getStackLinePrefix(stackLine)
  const label = getStackLineLabel(href)
  return [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    ...(prefix ? [text(prefix)] : []),
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStackLink,
      href,
      rel: 'noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text(label),
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
