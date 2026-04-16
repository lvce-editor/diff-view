import { expect, test } from '@jest/globals'
import { getActualDecorationIcon } from '../src/parts/GetActualDecorationIcon/GetActualDecorationIcon.ts'

test('getActualDecorationIcon - string icon', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = 'custom-icon'
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('custom-icon')
})

test('getActualDecorationIcon - number icon with valid index', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = 1
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('icon2')
})

test('getActualDecorationIcon - number icon with index 0', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = 0
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('icon1')
})

test('getActualDecorationIcon - number icon with last index', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = 2
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('icon3')
})

test('getActualDecorationIcon - number icon with out of bounds index', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = 5
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('not-available')
})

test('getActualDecorationIcon - number icon with negative index', () => {
  const iconDefinitions: readonly string[] = ['icon1', 'icon2', 'icon3']
  const icon = -1
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('not-available')
})

test('getActualDecorationIcon - number icon with empty array', () => {
  const iconDefinitions: readonly string[] = []
  const icon = 0
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('not-available')
})

test('getActualDecorationIcon - number icon with undefined value at index', () => {
  const iconDefinitions: readonly (string | undefined)[] = ['icon1', undefined, 'icon3']
  const icon = 1
  // @ts-expect-error
  const actual = getActualDecorationIcon(iconDefinitions, icon)
  expect(actual).toBe('not-available')
})
