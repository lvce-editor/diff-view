import type { TestApi } from '@lvce-editor/test-with-playwright'

interface RunImageFixtureTestOptions {
  readonly afterAlt?: string
  readonly afterImageSrc?: RegExp | string
  readonly afterText?: string
  readonly beforeAlt?: string
  readonly beforeErrorMessage?: string
  readonly beforeImageSrc?: RegExp | string
  readonly beforeText?: string
  readonly fixtureName: string
}

type WebViewLocator = Awaited<ReturnType<TestApi['WebView']['fromId']>>

const getImageLocator = (webView: WebViewLocator, side: 'before' | 'after'): WebViewLocator => {
  return webView.locator(`.DiffPane--${side} .ImageElement`)
}

const getPaneLocator = (webView: WebViewLocator, side: 'before' | 'after'): WebViewLocator => {
  return webView.locator(`.DiffPane--${side}`)
}

const expectAttribute = async (api: TestApi, locator: WebViewLocator, name: string, value: RegExp | string): Promise<void> => {
  const locatorExpect = api.expect(locator) as unknown as {
    toHaveAttribute(attributeName: string, attributeValue: RegExp | string): Promise<void>
  }
  await locatorExpect.toHaveAttribute(name, value)
}

export const runImageFixtureTest = async (api: TestApi, options: RunImageFixtureTestOptions): Promise<void> => {
  const { Command, expect, FileSystem, Main, WebView } = api
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/fixture.txt`, 'fixture')
  await Command.execute('DiffView.setFixture', options.fixtureName)

  await Main.openUri(`${tmpDir}/fixture.txt`)

  const webView = await WebView.fromId('diff-prototype')

  if (options.beforeText) {
    await expect(getPaneLocator(webView, 'before')).toContainText(options.beforeText)
  }
  if (options.beforeErrorMessage) {
    await expect(getPaneLocator(webView, 'before')).toContainText(options.beforeErrorMessage)
  }
  if (options.beforeAlt) {
    await expectAttribute(api, getImageLocator(webView, 'before'), 'alt', options.beforeAlt)
  }
  if (options.beforeImageSrc) {
    await expectAttribute(api, getImageLocator(webView, 'before'), 'src', options.beforeImageSrc)
  }
  if (options.afterText) {
    await expect(getPaneLocator(webView, 'after')).toContainText(options.afterText)
  }
  if (options.afterAlt) {
    await expectAttribute(api, getImageLocator(webView, 'after'), 'alt', options.afterAlt)
  }
  if (options.afterImageSrc) {
    await expectAttribute(api, getImageLocator(webView, 'after'), 'src', options.afterImageSrc)
  }
}
