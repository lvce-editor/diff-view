import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.ambiguous-duplicated-codeblocks'

const expectRowsToHaveText = async (expect: any, rows: any, texts: readonly string[]): Promise<void> => {
  for (let index = 0; index < texts.length; index += 1) {
    await expect(rows.nth(index)).toHaveText(texts[index])
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

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.ts`,
    `const beforeAnchor = true
${block}
${block}
${block}
const afterAnchor = true`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.ts`,
    `const beforeAnchor = true
${block}
${block}
const afterAnchor = true`,
  )
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

  await expect(leftRows).toHaveCount(17)
  await expect(rightRows).toHaveCount(17)
  await expect(rightGutterItems).toHaveCount(13)
  await expect(rightLineNumbers).toHaveCount(12)
  await expect(rightEmptyLineNumbers).toHaveCount(1)
  await expect(deletedRows).toHaveCount(5)
  await expect(insertedRows).toHaveCount(0)
  await expect(deletedRows.nth(0)).toHaveText('if (enabled) {')
  await expect(deletedRows.nth(1)).toHaveText('  prepare()')
  await expect(deletedRows.nth(2)).toHaveText('  render()')
  await expect(deletedRows.nth(3)).toHaveText('  cleanup()')
  await expect(deletedRows.nth(4)).toHaveText('}')

  await expectOneOf([
    (): Promise<void> =>
      expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', '', '', '', '', '', ...blockLines, ...blockLines, 'const afterAnchor = true']),
    (): Promise<void> =>
      expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', ...blockLines, '', '', '', '', '', ...blockLines, 'const afterAnchor = true']),
    (): Promise<void> =>
      expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', ...blockLines, ...blockLines, '', '', '', '', '', 'const afterAnchor = true']),
  ])
  await expectOneOf([
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '2', '3', '4', '5', '6', '', '7', '8', '9', '10', '11', '12']),
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '', '12']),
  ])
  await expect(rightEmptyLineNumbers.nth(0)).toHaveAttribute('style', 'height: 100px;')
}
