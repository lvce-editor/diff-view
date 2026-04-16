import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import { getIconType } from '../GetIconType/GetIconType.ts'

export const getMissingIconRequests = (dirents: readonly DisplayItem[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!(dirent.file in fileIconCache)) {
      missingRequests.push({
        name: dirent.label,
        type: getIconType(dirent.type),
      })
    }
  }

  return missingRequests
}
