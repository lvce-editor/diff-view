import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'

export const getPath = (item: DisplayItem): string => {
  return item.file
}
