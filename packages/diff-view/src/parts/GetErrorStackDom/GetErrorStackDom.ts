import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const stackLocationRegex = /((?:[a-zA-Z][a-zA-Z0-9+.-]*:\/\/|\/)[^\s)]+):(\d+):(\d+)\)?$/

const getStackLineHref = (location: string, allowedLinkSchemes: readonly string[]): string => {
  const scheme = location.startsWith('/') ? 'file' : location.slice(0, location.indexOf(':'))
  if (allowedLinkSchemes.includes(scheme)) {
    return scheme === 'file' ? `file://${location.startsWith('file://') ? location.slice('file://'.length) : location}` : location
  }
  return '#'
}

const getStackLineLocation = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return ''
  }
  const [, location] = match
  return location
}

const getStackLineLabel = (location: string): string => {
  if (!location) {
    return ''
  }
  const pathname = location.startsWith('file://') ? location.slice('file://'.length) : location
  const fileName = pathname.slice(pathname.lastIndexOf('/') + 1)
  return `(${fileName})`
}

const getStackLinePrefix = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return stackLine
  }
  return stackLine.slice(0, stackLine.length - match[0].length).replace(/\($/, '')
}

const getErrorStackLineDom = (stackLine: string, allowedLinkSchemes: readonly string[]): readonly VirtualDomNode[] => {
  const location = getStackLineLocation(stackLine)
  if (!location) {
    return [
      {
        childCount: 1,
        type: VirtualDomElements.Div,
      },
      text(stackLine),
    ]
  }
  const prefix = getStackLinePrefix(stackLine)
  const href = getStackLineHref(location, allowedLinkSchemes)
  const label = getStackLineLabel(location)
  return [
    {
      childCount: prefix ? 2 : 1,
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

export const getErrorStackDom = (errorStack: string, allowedLinkSchemes: readonly string[] = defaultAllowedLinkSchemes): readonly VirtualDomNode[] => {
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
    ...stackLines.flatMap((stackLine) => getErrorStackLineDom(stackLine, allowedLinkSchemes)),
  ]
}
