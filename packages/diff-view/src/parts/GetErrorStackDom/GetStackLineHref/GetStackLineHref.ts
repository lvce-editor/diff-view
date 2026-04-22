export const getStackLineHref = (location: string, allowedLinkSchemes: readonly string[]): string => {
  const scheme = location.startsWith('/') ? 'file' : location.slice(0, location.indexOf(':'))
  if (allowedLinkSchemes.includes(scheme)) {
    return scheme === 'file' ? `file://${location.startsWith('file://') ? location.slice('file://'.length) : location}` : location
  }
  return '#'
}
