const diffFixturesUri = '/packages/diff-view/src/browser/diffFixtures.js'

const loadFixtures = async () => {
  return import(diffFixturesUri)
}

let currentFixtureName = 'empty-before'

const getFixtureNameFromUri = async (uri) => {
  const { getFixture } = await loadFixtures()
  const parts = uri.split('/')
  const fileName = parts.at(-1) || ''
  const dotIndex = fileName.lastIndexOf('.')
  const candidate = dotIndex === -1 ? fileName : fileName.slice(0, dotIndex)
  try {
    getFixture(candidate)
    return candidate
  } catch {
    return currentFixtureName
  }
}

const commands = {
  async 'DiffView.getFixtureNames'() {
    const { fixtureNames } = await loadFixtures()
    return fixtureNames
  },
  async 'DiffView.setFixture'(fixtureName) {
    const { getFixture } = await loadFixtures()
    getFixture(fixtureName)
    currentFixtureName = fixtureName
  },
  async 'WebView.create'({ port, uri }) {
    const { getFixture } = await loadFixtures()
    const fixtureName = await getFixtureNameFromUri(uri)
    const fixture = getFixture(fixtureName)
    await port.invoke('renderFixture', fixture)
  },
}

const main = async () => {
  const uri = '/packages/renderer-worker/node_modules/@lvce-editor/extension-host-sub-worker/dist/extensionHostSubWorkerMainApi.js'
  const { listen, commandMap } = await import(uri)
  await listen({ ...commandMap, ...commands })
}

main()
