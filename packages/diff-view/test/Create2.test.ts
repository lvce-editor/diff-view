import { expect, test } from '@jest/globals'
import { create2 } from '../src/parts/Create2/Create2.ts'
import { get } from '../src/parts/DiffViewStates/DiffViewStates.ts'

test('create2 - creates state with provided parameters', (): void => {
  const id = 123
  const uri = 'file:///test/workspace'
  const x = 10
  const y = 20
  const width = 300
  const height = 400
  const workspacePath = '/test/workspace'

  create2(id, uri, x, y, width, height, workspacePath, 0, '')

  const { newState } = get(id)
  expect(newState).toBeDefined()
  expect(newState).toMatchObject({
    height,
    id,
    initial: true,
    leftWidth: 148,
    rightWidth: 148,
    uri,
    width,
    workspacePath,
    x,
    y,
  })
})
