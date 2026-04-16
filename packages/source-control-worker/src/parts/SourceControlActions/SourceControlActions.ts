import { DirentType } from '@lvce-editor/constants'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as Assert from '../Assert/Assert.ts'
import { requestSourceActions } from '../RequestSourceActions/RequestSourceActions.ts'

export const state = {
  cache: Object.create(null),
}

const getContextId = (groupId: string, type: number): string => {
  if (type === DirentType.File) {
    return `${groupId}-item`
  }
  return groupId
}

const ensureActions = async (): Promise<void> => {
  if (Object.keys(state.cache).length > 0) {
    return
  }
  const newCache = await requestSourceActions()
  state.cache = newCache
}

export const getSourceControlActions = async (providerId: any, groupId: string, type: number): Promise<readonly ActionButton[]> => {
  Assert.string(groupId)
  await ensureActions()
  const contextId = getContextId(groupId, type)
  const value = state.cache[contextId] || []
  return value
}
