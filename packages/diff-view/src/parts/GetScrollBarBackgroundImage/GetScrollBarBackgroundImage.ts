import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import { getVisibleInlineDiffRows } from '../GetVisibleInlineDiffRows/GetVisibleInlineDiffRows.ts'
import * as InlineDiffChangeType from '../InlineDiffChangeType/InlineDiffChangeType.ts'

const AddedColor = 'rgba(46, 160, 67, 0.72)'
const DeletedColor = 'rgba(248, 81, 73, 0.72)'

type ScrollBarMarkerType = 'added' | 'deleted'

interface ScrollBarMarker {
  readonly color: string
  readonly end: number
  readonly start: number
}

const formatPercentage = (value: number): string => {
  return String(Number(value.toFixed(4)))
}

const getScrollBarMarkerType = (changeType: number | undefined): ScrollBarMarkerType | '' => {
  if (changeType === InlineDiffChangeType.Insertion) {
    return 'added'
  }
  if (changeType === InlineDiffChangeType.Deletion) {
    return 'deleted'
  }
  return ''
}

const getScrollBarMarkerColor = (type: ScrollBarMarkerType): string => {
  if (type === 'added') {
    return AddedColor
  }
  return DeletedColor
}

const getScrollBarMarkersForSide = (rows: ReturnType<typeof getVisibleInlineDiffRows>, side: 'left' | 'right', totalLineCount: number): readonly ScrollBarMarker[] => {
  const markers: ScrollBarMarker[] = []
  let start = 0
  let activeType: ScrollBarMarkerType | '' = ''

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index]
    const change = side === 'left' ? row.leftChange : row.rightChange
    const nextType = getScrollBarMarkerType(change?.type)

    if (nextType === activeType) {
      continue
    }

    if (activeType) {
      markers.push({
        color: getScrollBarMarkerColor(activeType),
        end: (index / totalLineCount) * 100,
        start: (start / totalLineCount) * 100,
      })
    }

    activeType = nextType
    start = index
  }

  if (activeType) {
    markers.push({
      color: getScrollBarMarkerColor(activeType),
      end: (rows.length / totalLineCount) * 100,
      start: (start / totalLineCount) * 100,
    })
  }

  return markers
}

const getScrollBarMarkerBackgroundImage = ({ color, end, start }: ScrollBarMarker): string => {
  const formattedStart = formatPercentage(start)
  const formattedEnd = formatPercentage(end)
  return `linear-gradient(to bottom, transparent ${formattedStart}%, ${color} ${formattedStart}%, ${color} ${formattedEnd}%, transparent ${formattedEnd}%)`
}

export const getScrollBarBackgroundImage = (inlineChanges: readonly InlineDiffChange[], totalLineCount: number): string => {
  if (inlineChanges.length === 0 || totalLineCount === 0) {
    return 'none'
  }

  const rows = getVisibleInlineDiffRows(inlineChanges)
  const markers = [...getScrollBarMarkersForSide(rows, 'left', totalLineCount), ...getScrollBarMarkersForSide(rows, 'right', totalLineCount)]

  if (markers.length === 0) {
    return 'none'
  }

  return markers.map(getScrollBarMarkerBackgroundImage).join(', ')
}
