export const getStackLineLabel = (location: string): string => {
  if (!location) {
    return ''
  }
  const pathname = location.startsWith('file://') ? location.slice('file://'.length) : location
  const fileName = pathname.slice(pathname.lastIndexOf('/') + 1)
  return `(${fileName})`
}
