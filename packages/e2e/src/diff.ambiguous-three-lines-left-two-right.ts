import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.ambiguous-three-lines-left-two-right'

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

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.ts`,
    `const beforeAnchor = true
renderItem()
renderItem()
renderItem()
const afterAnchor = true`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.ts`,
    `const beforeAnchor = true
renderItem()
renderItem()
const afterAnchor = true`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.ts`, `${tmpDir}/after.ts`)

  const leftRows = Locator('.DiffEditorContentLeft .EditorRow')
  const rightRows = Locator('.DiffEditorContentRight .EditorRow')
  const leftLineNumbers = Locator('.DiffEditorContentLeft .DiffEditorLineNumber')
  const rightLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumber')
  const rightEmptyLineNumbers = Locator('.DiffEditorContentRight .DiffEditorLineNumberEmpty')
  const rightGutterItems = Locator('.DiffEditorContentRight .DiffEditorGutter > div')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(leftRows).toHaveCount(5)
  await expect(rightRows).toHaveCount(5)
  await expect(leftLineNumbers).toHaveCount(5)
  await expect(rightLineNumbers).toHaveCount(4)
  await expect(rightEmptyLineNumbers).toHaveCount(1)
  await expect(rightGutterItems).toHaveCount(5)
  await expect(deletedRows).toHaveCount(1)
  await expect(insertedRows).toHaveCount(0)
  await expect(deletedRows.nth(0)).toHaveText('renderItem()')

  await expectRowsToHaveText(expect, leftRows, ['const beforeAnchor = true', 'renderItem()', 'renderItem()', 'renderItem()', 'const afterAnchor = true'])
  await expectOneOf([
    (): Promise<void> => expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', '', 'renderItem()', 'renderItem()', 'const afterAnchor = true']),
    (): Promise<void> => expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', 'renderItem()', '', 'renderItem()', 'const afterAnchor = true']),
    (): Promise<void> => expectRowsToHaveText(expect, rightRows, ['const beforeAnchor = true', 'renderItem()', 'renderItem()', '', 'const afterAnchor = true']),
  ])
  await expectOneOf([
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '', '2', '3', '4']),
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '2', '', '3', '4']),
    (): Promise<void> => expectRowsToHaveText(expect, rightGutterItems, ['1', '2', '3', '', '4']),
  ])
}
