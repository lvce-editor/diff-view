import type { Test } from '@lvce-editor/test-with-playwright'

const getContent = (targetLine: string): string => {
  return Array.from({ length: 900 }, (_, index) => {
    if (index === 339) {
      return targetLine
    }
    return `shared line ${index + 1}`
  }).join('\n')
}

export const name = 'viewlet.diff-editor-scrollbar-track-click'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, getContent('before target row'))
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, getContent('after target row'))
  await Workspace.setUri(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const scrollBarTrack = Locator('.DiffScrollBarTrack')
  for (const mode of ['side-by-side', 'inline'] as const) {
    await Command.execute('DiffView.setDiffMode', mode)
    const rows = Locator(mode === 'inline' ? '.InlineDiffEditor .DiffEditorRows' : '.DiffEditorContentLeft .DiffEditorRows')
    await rows.dispatchEvent('wheel', {
      bubbles: true,
      deltaMode: 0,
      deltaY: -9_999_999,
    })

    await scrollBarTrack.dispatchEvent('pointerdown', {
      bubbles: true,
      buttons: 1,
      clientY: 300,
      isPrimary: true,
      pointerId: 1,
      pointerType: 'mouse',
    } as unknown as string)
    await scrollBarTrack.dispatchEvent('pointerup', {
      bubbles: true,
      buttons: 0,
      clientY: 300,
      isPrimary: true,
      pointerId: 1,
      pointerType: 'mouse',
    } as unknown as string)

    await expect(rows).toContainText('before target row')
    if (mode === 'inline') {
      await expect(rows).toContainText('after target row')
    } else {
      await expect(Locator('.DiffEditorContentRight .DiffEditorRows')).toContainText('after target row')
    }
  }
}
