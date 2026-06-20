import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.many-ambiguous-duplicated-codeblocks'

const expectRowsToHaveText = async (expect: any, rows: any, texts: readonly string[]): Promise<void> => {
  for (let index = 0; index < texts.length; index += 1) {
    const expectedLocator0 = rows.nth(index)
    await expect(expectedLocator0).toHaveText(texts[index])
  }
}

const toError = (error: unknown, fallbackMessage: string): Error => {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === 'string') {
    return new Error(error)
  }
  return new Error(fallbackMessage)
}

const expectOneOf = async (callbacks: ReadonlyArray<() => Promise<void>>): Promise<void> => {
  const errors: unknown[] = []
  for (const callback of callbacks) {
    try {
      await callback()
      return
    } catch (error) {
      errors.push(error)
    }
  }
  throw toError(errors[0], 'No expected layout matched')
}

const block = `if (enabled) {
  prepare()
  render()
  cleanup()
}`

const repeatText = (text: string, count: number): string[] => {
  const texts: string[] = []
  for (let index = 0; index < count; index += 1) {
    texts.push(text)
  }
  return texts
}

const createFileContent = (blockCount: number): string => {
  return ['const beforeAnchor = true', ...repeatText(block, blockCount), 'const afterAnchor = true'].join('\n')
}

const createExpectedRightRows = (blankBlockPosition: number, visibleBlockCount: number, deletedBlockCount: number, blockLines: readonly string[]): readonly string[] => {
  const rows = ['const beforeAnchor = true']
  for (let index = 0; index < visibleBlockCount; index += 1) {
    if (index === blankBlockPosition) {
      rows.push(...repeatText('', deletedBlockCount * blockLines.length))
    }
    rows.push(...blockLines)
  }
  if (blankBlockPosition === visibleBlockCount) {
    rows.push(...repeatText('', deletedBlockCount * blockLines.length))
  }
  rows.push('const afterAnchor = true')
  return rows
}

const createExpectedRightGutterItems = (blankBlockPosition: number, visibleBlockCount: number, blockLines: readonly string[]): readonly string[] => {
  const items = ['1']
  let lineNumber = 2
  for (let index = 0; index < visibleBlockCount; index += 1) {
    if (index === blankBlockPosition) {
      items.push('')
    }
    for (let blockLineIndex = 0; blockLineIndex < blockLines.length; blockLineIndex += 1) {
      items.push(String(lineNumber))
      lineNumber += 1
    }
  }
  if (blankBlockPosition === visibleBlockCount) {
    items.push('')
  }
  items.push(String(lineNumber))
  return items
}

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const beforeBlockCount = 6
  const afterBlockCount = 3
  const deletedBlockCount = beforeBlockCount - afterBlockCount

  await FileSystem.writeFile(`${tmpDir}/before.ts`, createFileContent(beforeBlockCount))
  await FileSystem.writeFile(`${tmpDir}/after.ts`, createFileContent(afterBlockCount))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.ts`, `${tmpDir}/after.ts`)

  const leftRows = Locator('.DiffEditorContentLeft .EditorRow')
  const rightRows = Locator('.DiffEditorContentRight .EditorRow')
  const rightGutterItems = Locator('.DiffEditorContentRight .DiffEditorGutter > div')
  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')
  const rightEmptyLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumberEmpty')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')
  const blockLines = block.split('\n')
  const beforeLineCount = 2 + beforeBlockCount * blockLines.length
  const afterLineCount = 2 + afterBlockCount * blockLines.length
  const deletedLineCount = deletedBlockCount * blockLines.length
  const possibleBlankBlockPositions = Array.from({ length: afterBlockCount + 1 }, (_, index) => index)

  await expect(leftRows).toHaveCount(beforeLineCount)
  await expect(rightRows).toHaveCount(beforeLineCount)
  await expect(rightGutterItems).toHaveCount(afterLineCount + 1)
  await expect(rightLineNumbers).toHaveCount(afterLineCount)
  await expect(rightEmptyLineNumbers).toHaveCount(1)
  await expect(deletedRows).toHaveCount(deletedLineCount)
  await expect(insertedRows).toHaveCount(0)
  await expectRowsToHaveText(expect, deletedRows, [...blockLines, ...blockLines, ...blockLines])

  await expectOneOf(
    possibleBlankBlockPositions.map((blankBlockPosition) => {
      return (): Promise<void> => expectRowsToHaveText(expect, rightRows, createExpectedRightRows(blankBlockPosition, afterBlockCount, deletedBlockCount, blockLines))
    }),
  )
  await expectOneOf(
    possibleBlankBlockPositions.map((blankBlockPosition) => {
      return (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, createExpectedRightGutterItems(blankBlockPosition, afterBlockCount, blockLines))
    }),
  )
  const expectedLocator1 = rightEmptyLineNumbers.nth(0)
  await expect(expectedLocator1).toHaveAttribute('style', 'height: 300px;')
}
