import { test, expect, Locator } from './utils'

// Verifies .DiffEditorLineNumber has flex-shrink: 0 so it doesn't collapse
test('diff editor line numbers have flex-shrink 0', async ({ page }) => {
  await page.goto('/')

  const lineNumber = Locator('.DiffEditorContentLeft .DiffEditorLineNumber').first()
  await expect(lineNumber).toHaveCount(1)

  const flexShrink = await lineNumber.evaluate((el) => getComputedStyle(el).getPropertyValue('flex-shrink'))
  expect(flexShrink).toBe('0')
})
