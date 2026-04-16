import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import { getPath } from '../GetPath/GetPath.ts'

export const getPaths = (items: readonly DisplayItem[]): readonly string[] => {
  return items.map(getPath)
}
