// @ts-nocheck

const styleId = 'diff-prototype-styles'

const css = `
:root {
  color-scheme: light;
  font-family: 'Segoe UI', sans-serif;
}

body {
  margin: 0;
}

.DiffPrototype {
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
  box-sizing: border-box;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
}

.DiffHero {
  font-size: 18px;
  font-weight: 700;
}

.DiffPanes {
  display: flex;
  gap: 16px;
  min-height: 320px;
}

.DiffPane {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  box-sizing: border-box;
  contain: strict;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  padding: 16px;
}

.DiffEmptyState,
.ImageErrorMessage {
  align-items: center;
  background: rgba(15, 23, 42, 0.05);
  border-radius: 12px;
  color: #475569;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 16px;
  text-align: center;
}

.DiffErrorState {
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.14);
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 16px;
}

.DiffErrorMessage {
  color: #991b1b;
  font-weight: 600;
}

.DiffErrorStack {
  color: #475569;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.DiffRow {
  border-radius: 10px;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 20px;
  padding: 8px 10px;
  white-space: pre-wrap;
}

.DiffRow--deleted {
  background: rgba(220, 38, 38, 0.1);
}

.DiffRow--inserted {
  background: rgba(22, 163, 74, 0.12);
}

.DiffToken--changed {
  background: rgba(245, 158, 11, 0.22);
  border-radius: 4px;
}

.ImageContent {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: auto;
}

.ImageElement {
  background: radial-gradient(circle at top, rgba(14, 165, 233, 0.18), transparent 60%), #f8fafc;
  border-radius: 14px;
  display: block;
  max-height: 100%;
  max-width: 100%;
  min-height: 120px;
  min-width: 120px;
  object-fit: contain;
}
`

const ensureStyles = (document) => {
  if (document.getElementById(styleId)) {
    return
  }
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = css
  document.head.append(style)
}

const createElement = (document, tagName, className, text = '') => {
  const element = document.createElement(tagName)
  element.className = className
  if (text) {
    element.textContent = text
  }
  return element
}

const renderErrorPane = (document, pane, fixture) => {
  const errorState = createElement(document, 'div', 'DiffErrorState')
  errorState.append(createElement(document, 'div', 'DiffErrorMessage', fixture.errorMessage))
  if (fixture.errorStack) {
    const errorStack = createElement(document, 'div', 'DiffErrorStack', fixture.errorStack)
    errorState.append(errorStack)
  }
  pane.append(errorState)
}

const renderTextPane = (document, pane, fixture) => {
  if (fixture.errorMessage) {
    renderErrorPane(document, pane, fixture)
    return
  }
  if (fixture.emptyMessage) {
    pane.append(createElement(document, 'div', 'DiffEmptyState', fixture.emptyMessage))
    return
  }
  for (const row of fixture.rows || []) {
    const statusClass = row.status && row.status !== 'normal' ? ` DiffRow--${row.status}` : ''
    const rowElement = createElement(document, 'div', `DiffRow${statusClass}`)
    for (const part of row.parts) {
      if (part.changed) {
        rowElement.append(createElement(document, 'span', 'DiffToken--changed', part.text))
        continue
      }
      rowElement.append(part.text)
    }
    pane.append(rowElement)
  }
}

const renderImagePane = (document, pane, fixture) => {
  const content = createElement(document, 'div', 'ImageContent')
  if (fixture.errorMessage) {
    content.append(createElement(document, 'div', 'ImageErrorMessage', fixture.errorMessage))
    pane.append(content)
    return
  }
  const image = createElement(document, 'img', 'ImageElement')
  image.alt = fixture.alt
  image.src = fixture.src || ''
  content.append(image)
  pane.append(content)
}

const renderPane = (document, side, fixture) => {
  const pane = createElement(document, 'div', `DiffPane DiffPane--${side}`)
  if (fixture.type === 'image') {
    renderImagePane(document, pane, fixture)
  } else {
    renderTextPane(document, pane, fixture)
  }
  return pane
}

export const renderDiffFixture = (container, fixture) => {
  const { ownerDocument } = container
  ensureStyles(ownerDocument)
  container.textContent = ''

  const root = createElement(ownerDocument, 'div', 'DiffPrototype')
  root.append(createElement(ownerDocument, 'div', 'DiffHero', fixture.hero))

  const panes = createElement(ownerDocument, 'div', 'DiffPanes')
  panes.append(renderPane(ownerDocument, 'before', fixture.before))
  panes.append(renderPane(ownerDocument, 'after', fixture.after))

  root.append(panes)
  container.append(root)
}
