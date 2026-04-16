import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetLabelClassName from '../src/parts/GetLabelClassName/GetLabelClassName.ts'

test('getLabelClassName - with strike through', () => {
  const result = GetLabelClassName.getLabelClassName(true)
  expect(result).toBe(`${ClassNames.Label} Grow ${ClassNames.StrikeThrough}`)
})

test('getLabelClassName - without strike through', () => {
  const result = GetLabelClassName.getLabelClassName(false)
  expect(result).toBe(`${ClassNames.Label} Grow`)
})
