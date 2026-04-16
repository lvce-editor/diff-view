const diffFixturesUri = '/packages/diff-view/src/browser/diffFixtures.js'

const loadFixtures = async () => {
  return import(diffFixturesUri)
}

let currentFixtureName = 'empty-before'

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
  async 'WebView.create'({ port }) {
    const { getFixture } = await loadFixtures()
    const fixture = getFixture(currentFixtureName)
    await port.invoke('renderFixture', fixture)
  },
}

const main = async () => {
  const uri = '/packages/renderer-worker/node_modules/@lvce-editor/extension-host-sub-worker/dist/extensionHostSubWorkerMainApi.js'
  const { listen, commandMap } = await import(uri)
  await listen({ ...commandMap, ...commands })
}

main()