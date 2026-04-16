export const info = (...args: readonly any[]): void => {
  // @ts-ignore
  // eslint-disable-next-line no-console
  console.info(...args)
}

export const warn = (...args: readonly any[]): void => {
  // @ts-ignore
  console.warn(...args)
}

export const error = (...args: readonly any[]): void => {
  // @ts-ignore
  console.error(...args)
}
