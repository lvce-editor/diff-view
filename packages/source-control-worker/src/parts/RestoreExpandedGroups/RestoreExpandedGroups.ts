/* eslint-disable unicorn/no-array-reduce */
export const restoreExpandedGroups = (groups: readonly any[]): any => {
  return groups
    .map((group) => group.id)
    .reduce((total, current) => {
      return {
        ...total,
        [current]: true,
      }
    }, Object.create(null))
}
