import { test, expect } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { getIconType } from '../src/parts/GetIconType/GetIconType.ts'

test('getIconType - Directory returns 2', (): void => {
  const result = getIconType(DirentType.Directory)
  expect(result).toBe(2)
})

test('getIconType - DirectoryExpanded returns 2', (): void => {
  const result = getIconType(DirentType.DirectoryExpanded)
  expect(result).toBe(2)
})

test('getIconType - File returns 1', (): void => {
  const result = getIconType(DirentType.File)
  expect(result).toBe(1)
})

test('getIconType - BlockDevice returns 1', (): void => {
  const result = getIconType(DirentType.BlockDevice)
  expect(result).toBe(1)
})

test('getIconType - CharacterDevice returns 1', (): void => {
  const result = getIconType(DirentType.CharacterDevice)
  expect(result).toBe(1)
})

test('getIconType - default case returns 1', (): void => {
  const result = getIconType(999)
  expect(result).toBe(1)
})
