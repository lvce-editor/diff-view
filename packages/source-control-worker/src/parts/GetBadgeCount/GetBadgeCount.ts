import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const getBadgeCount = ({ badgeCount }: SourceControlState): number => {
  return badgeCount
}
