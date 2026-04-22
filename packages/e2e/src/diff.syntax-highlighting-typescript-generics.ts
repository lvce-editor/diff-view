import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-typescript-generics'

export const test: Test = async ({ DiffView, FileSystem, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.ts`,
    `type LoaderResult<TValue, TMeta extends Record<string, unknown> = Record<string, never>> = {
  readonly value: TValue
  readonly meta: TMeta
}

export async function mapByKey<
  TItem extends { readonly id: string },
  TResult,
>(
  items: readonly TItem[],
  select: <TCurrent extends TItem>(item: TCurrent) => Promise<TResult>,
): Promise<Record<string, LoaderResult<TResult>>> {
  const entries = await Promise.all(
    items.map(async (item) => [item.id, { value: await select(item), meta: {} }] as const),
  )

  return Object.fromEntries(entries) as Record<string, LoaderResult<TResult>>
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.ts`,
    `type LoaderResult<TValue, TMeta extends Record<string, unknown> = { readonly source: 'remote' }> = {
  readonly value: TValue
  readonly meta: TMeta
}

export async function mapByKey<
  TItem extends { readonly key: string },
  TResult,
>(
  items: readonly TItem[],
  select: <TCurrent extends TItem>(item: TCurrent) => Promise<TResult>,
): Promise<Record<string, LoaderResult<TResult, { readonly source: 'remote' }>>> {
  const entries = await Promise.all(
    items.map(async (item) => [item.key, { value: await select(item), meta: { source: 'remote' } }] as const),
  )

  return Object.fromEntries(entries) as Record<string, LoaderResult<TResult, { readonly source: 'remote' }>>
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.ts`, `${tmpDir}/right.ts`)

  // TODO
  // const beforePane = Locator('.DiffPane--before')
  // const afterPane = Locator('.DiffPane--after')

  // await expect(beforePane).toContainText('Record<string, never>')
  // await expect(afterPane).toContainText("{ readonly source: 'remote' }")
  // await expect(beforePane).toContainText('TItem extends { readonly id: string }')
  // await expect(afterPane).toContainText('TItem extends { readonly key: string }')
  // await expect(beforePane).toContainText('[item.id, { value: await select(item), meta: {} }] as const')
  // await expect(afterPane).toContainText("[item.key, { value: await select(item), meta: { source: 'remote' } }] as const")
  // await expect(beforePane.locator('.Token.Keyword')).not.toHaveCount(0)
  // await expect(afterPane.locator('.Token.Keyword')).not.toHaveCount(0)
  // await expect(afterPane.locator('.Token.String')).not.toHaveCount(0)
  // await expect(beforePane).not.toContainText('item.key')
  // await expect(afterPane).not.toContainText('item.id')
}
