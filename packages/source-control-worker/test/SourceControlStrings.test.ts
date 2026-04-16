import { test, expect } from '@jest/globals'
import * as I18nString from '../src/parts/I18NString/I18NString.ts'
import * as SourceControlStrings from '../src/parts/SourceControlStrings/SourceControlStrings.ts'
import * as UiStrings from '../src/parts/UiStrings/UiStrings.ts'

test('openChanges', () => {
  const result = SourceControlStrings.openChanges()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenChanges))
})

test('openFile', () => {
  const result = SourceControlStrings.openFile()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenFile))
})

test('openFileHead', () => {
  const result = SourceControlStrings.openFileHead()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenFileHead))
})

test('discardChanges', () => {
  const result = SourceControlStrings.discardChanges()
  expect(result).toBe(I18nString.i18nString(UiStrings.DiscardChanges))
})

test('stageChanges', () => {
  const result = SourceControlStrings.stageChanges()
  expect(result).toBe(I18nString.i18nString(UiStrings.StageChanges))
})

test('addToGitignore', () => {
  const result = SourceControlStrings.addToGitignore()
  expect(result).toBe(I18nString.i18nString(UiStrings.AddToGitignore))
})

test('revealInExplorerView', () => {
  const result = SourceControlStrings.revealInExplorerView()
  expect(result).toBe(I18nString.i18nString(UiStrings.RevealInExplorerView))
})

test('openContainingFolder', () => {
  const result = SourceControlStrings.openContainingFolder()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenContainingFolder))
})

test('discardAll', () => {
  const result = SourceControlStrings.discardAll()
  expect(result).toBe(I18nString.i18nString(UiStrings.DiscardAll))
})

test('stageAll', () => {
  const result = SourceControlStrings.stageAll()
  expect(result).toBe(I18nString.i18nString(UiStrings.StageAll))
})

test('discard', () => {
  const result = SourceControlStrings.discard()
  expect(result).toBe(I18nString.i18nString(UiStrings.Discard))
})

test('stage', () => {
  const result = SourceControlStrings.stage()
  expect(result).toBe(I18nString.i18nString(UiStrings.Stage))
})

test('unstageAll', () => {
  const result = SourceControlStrings.unstageAll()
  expect(result).toBe(I18nString.i18nString(UiStrings.UnstageAll))
})

test('unstage', () => {
  const result = SourceControlStrings.unstage()
  expect(result).toBe(I18nString.i18nString(UiStrings.Unstage))
})

test('viewAsTree', () => {
  const result = SourceControlStrings.viewAsTree()
  expect(result).toBe(I18nString.i18nString(UiStrings.ViewAsTree))
})

test('createPullRequest', () => {
  const result = SourceControlStrings.createPullRequest()
  expect(result).toBe(I18nString.i18nString(UiStrings.CreatePullRequest))
})

test('commitAndPush', () => {
  const result = SourceControlStrings.commitAndPush()
  expect(result).toBe(I18nString.i18nString(UiStrings.CommitAndPush))
})

test('refresh', () => {
  const result = SourceControlStrings.refresh()
  expect(result).toBe(I18nString.i18nString(UiStrings.Refresh))
})

test('messageEnterToCommitOnMaster', () => {
  const result = SourceControlStrings.messageEnterToCommitOnMaster()
  expect(result).toBe(I18nString.i18nString(UiStrings.MessageEnterToCommitOnMaster))
})

test('sourceControlInput', () => {
  const result = SourceControlStrings.sourceControlInput()
  expect(result).toBe(I18nString.i18nString(UiStrings.SourceControlInput))
})
