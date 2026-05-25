export const getStackLineHref = (location: string, allowedLinkSchemes: readonly string[]): string => {
  const scheme = location.startsWith('/') ? 'file' : location.slice(0, location.indexOf(':'))
  if (allowedLinkSchemes.includes(scheme)) {
    if (scheme !== 'file') {
      return location
    }
    const fileLocation = location.startsWith('file://') ? location.slice('file://'.length) : location
    return `file://${fileLocation}`
  }
  return '#'
}
