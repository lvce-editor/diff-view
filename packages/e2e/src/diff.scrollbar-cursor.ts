import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.scrollbar-cursor'

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const content = Array.from({ length: 900 }, (_, index) => `shared line ${index + 1}`).join('\n')
  await FileSystem.writeFile(`${tmpDir}/before.txt`, `${content}\nbottom before`)
  await FileSystem.writeFile(`${tmpDir}/after.txt`, `${content}\nbottom after`)
  await Workspace.setPath(tmpDir)
  await DiffView.open(`${tmpDir}/before.txt`, `${tmpDir}/after.txt`)

  const scrollBar = Locator('.DiffScrollBar')
  const scrollBarThumb = Locator('.DiffScrollBarThumb')
  for (const mode of ['side-by-side', 'inline'] as const) {
    await Command.execute('DiffView.setDiffMode', mode)
    await expect(scrollBar).toHaveCSS('cursor', 'default')
    await expect(scrollBarThumb).toHaveCSS('cursor', 'default')

    const diffRows = Locator(mode === 'inline' ? '.InlineDiffEditor .DiffEditorRows' : '.DiffEditorContentLeft .DiffEditorRows')
    await diffRows.dispatchEvent('wheel', {
      bubbles: true,
      deltaMode: 0,
      deltaY: 9_999_999,
    } as unknown as string)

    await expect(diffRows).toContainText('bottom before')
    if (mode === 'inline') {
      await expect(diffRows).toContainText('bottom after')
    } else {
      await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('bottom after')
    }
  }
}
