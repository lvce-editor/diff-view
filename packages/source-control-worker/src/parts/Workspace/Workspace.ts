// TODO this should be in FileSystem module
export const pathBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

export const pathRelative = (path: string): string => {
  return path
}
