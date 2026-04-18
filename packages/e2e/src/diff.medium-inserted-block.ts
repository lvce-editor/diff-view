import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.medium-inserted-block'

const insertedRowBackground = 'rgba(22, 163, 74, 0.12)'

export const test: Test = async ({ Command, expect, FileSystem, Main, WebView }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', 'medium-inserted-block')

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')
  const beforePane = webView.locator('.DiffPane--before')
  const afterPane = webView.locator('.DiffPane--after')
  const insertedRows = webView.locator('.DiffPane--after .DiffRow--inserted')

  await expect(beforePane).toContainText('renderFooter()')
  await expect(beforePane).not.toContainText('renderTable(stats.items)')
  await expect(afterPane).toContainText('renderTable(stats.items)')
  await expect(insertedRows).toHaveCount(4)

  const backgroundColors = await insertedRows.evaluateAll((elements) => {
    return elements.map((element) => {
      const ownerWindow = (element as any).ownerDocument.defaultView
      return ownerWindow.getComputedStyle(element).backgroundColor
    })
  })

  const unexpectedColor = backgroundColors.find((color) => color !== insertedRowBackground)
  if (unexpectedColor) {
    throw new Error(`Expected inserted rows to be ${insertedRowBackground}, got ${backgroundColors.join(', ')}`)
  }
}
