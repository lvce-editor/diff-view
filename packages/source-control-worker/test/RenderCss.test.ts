import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderCss from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss - returns correct command with CSS', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputBoxHeight: 30,
    visibleItems: [],
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    1,
    `:root {
  --SourceControlInputHeight: 30px;
}
`,
  ])
})

test('renderCss - handles different input box heights', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputBoxHeight: 50,
    visibleItems: [],
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    2,
    `:root {
  --SourceControlInputHeight: 50px;
}
`,
  ])
})

test('renderCss - handles zero height', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputBoxHeight: 0,
    visibleItems: [],
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    3,
    `:root {
  --SourceControlInputHeight: 0px;
}
`,
  ])
})

test('renderCss - handles large height values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 4,
    inputBoxHeight: 200,
    visibleItems: [],
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    4,
    `:root {
  --SourceControlInputHeight: 200px;
}
`,
  ])
})

test('renderCss - generates indent CSS rules', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 5,
    inputBoxHeight: 30,
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test1',
        fileIcon: '',
        groupId: 'test',
        icon: '',
        indent: 0,
        label: 'test1',
        posInSet: 1,
        setSize: 1,
        type: 1,
      },
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test2',
        fileIcon: '',
        groupId: 'test',
        icon: '',
        indent: 16,
        label: 'test2',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    5,
    `:root {
  --SourceControlInputHeight: 30px;
}
.Indent-0 {
  padding-left: 0px;
}
.Indent-16 {
  padding-left: 16px;
}
`,
  ])
})
