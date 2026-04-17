import { renderDiffFixture } from '/packages/diff-view/src/browser/renderDiffFixture.js'

const rpc = globalThis.lvceRpc({
  renderFixture(fixture) {
    renderDiffFixture(document.body, fixture)
  },
})

void rpc
