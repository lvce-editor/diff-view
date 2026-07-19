import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getInlineDiffRowDom } from '../src/parts/GetInlineDiffRowDom/GetInlineDiffRowDom.ts'
import { InlineDiffRowType } from '../src/parts/InlineDiffRowType/InlineDiffRowType.ts'

test('getInlineDiffRowDom renders right-side syntax tokens for context rows', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: 1, text: 'name: Test', type: InlineDiffRowType.Context }
  const result = getInlineDiffRowDom(row, ['name', 'Token YamlPropertyName', ': ', 'Token Punctuation', 'Test', 'Token YamlPropertyValueString'])

  expect(result).toEqual([
    {
      childCount: 4,
      className: ClassNames.EditorRow,
      type: VirtualDomElements.Div,
    },
    text('  '),
    {
      childCount: 1,
      className: 'Token YamlPropertyName',
      type: VirtualDomElements.Span,
    },
    text('name'),
    {
      childCount: 1,
      className: 'Token Punctuation',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token YamlPropertyValueString',
      type: VirtualDomElements.Span,
    },
    text('Test'),
  ])
})

test('getInlineDiffRowDom renders left-side syntax tokens for deletions', (): void => {
  const row = { lineNumberLeft: 1, lineNumberRight: null, text: 'enabled: true', type: InlineDiffRowType.Deletion }
  const result = getInlineDiffRowDom(row, ['enabled', 'Token YamlPropertyName', ': ', 'Token Punctuation', 'true', 'Token LanguageConstant'])

  expect(result[1]).toEqual(text('- '))
  expect(result).toContainEqual({
    childCount: 1,
    className: 'Token LanguageConstant',
    type: VirtualDomElements.Span,
  })
})

test('getInlineDiffRowDom renders plain text when tokenization is unavailable', (): void => {
  const row = { lineNumberLeft: null, lineNumberRight: 2, text: 'added', type: InlineDiffRowType.Insertion }

  expect(getInlineDiffRowDom(row)).toEqual([
    {
      childCount: 2,
      className: ClassNames.EditorRowInsertion,
      type: VirtualDomElements.Div,
    },
    text('+ '),
    text('added'),
  ])
})
