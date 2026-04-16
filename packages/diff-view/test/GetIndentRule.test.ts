import { test, expect } from '@jest/globals'
import * as GetIndentRule from '../src/parts/GetIndentRule/GetIndentRule.ts'

test('getIndentRule - zero indent', () => {
  const result = GetIndentRule.getIndentRule(0)
  expect(result).toBe(`.Indent-0 {
  padding-left: 0px;
}`)
})

test('getIndentRule - small indent', () => {
  const result = GetIndentRule.getIndentRule(10)
  expect(result).toBe(`.Indent-10 {
  padding-left: 10px;
}`)
})

test('getIndentRule - medium indent', () => {
  const result = GetIndentRule.getIndentRule(20)
  expect(result).toBe(`.Indent-20 {
  padding-left: 20px;
}`)
})

test('getIndentRule - large indent', () => {
  const result = GetIndentRule.getIndentRule(100)
  expect(result).toBe(`.Indent-100 {
  padding-left: 100px;
}`)
})

test('getIndentRule - negative indent', () => {
  const result = GetIndentRule.getIndentRule(-5)
  expect(result).toBe(`.Indent--5 {
  padding-left: -5px;
}`)
})
