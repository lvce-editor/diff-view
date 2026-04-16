const theme = `
  :root {
    color-scheme: dark;
    --diff-bg: linear-gradient(180deg, #11161e 0%, #0b1017 100%);
    --panel-bg: rgba(9, 14, 22, 0.86);
    --panel-border: rgba(154, 173, 195, 0.16);
    --panel-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    --text-strong: #f4f1e8;
    --text-muted: #9cacba;
    --insert-bg: rgba(39, 140, 92, 0.18);
    --delete-bg: rgba(178, 69, 69, 0.22);
    --modified-bg: rgba(193, 147, 52, 0.14);
    --token-added: #9ef0bd;
    --token-removed: #ffb5b5;
    --token-changed: #ffd58a;
    --line-number: rgba(156, 172, 186, 0.56);
    --context-line: rgba(244, 241, 232, 0.04);
    --accent: #d7b979;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: radial-gradient(circle at top left, rgba(215, 185, 121, 0.1), transparent 32%), var(--diff-bg);
    color: var(--text-strong);
    font-family: 'Avenir Next', 'Gill Sans', 'Trebuchet MS', sans-serif;
  }

  .DiffPrototype {
    min-height: 100vh;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .DiffHero {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 20px;
    border: 1px solid var(--panel-border);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(17, 24, 33, 0.92), rgba(12, 16, 24, 0.78));
    box-shadow: var(--panel-shadow);
  }

  .DiffEyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 11px;
    color: var(--accent);
  }

  .DiffTitle {
    font-size: 26px;
    line-height: 1.1;
    font-family: 'Alegreya Sans', 'Trebuchet MS', sans-serif;
  }

  .DiffDescription {
    color: var(--text-muted);
    font-size: 14px;
    max-width: 72ch;
  }

  .DiffColumns {
    display: flex;
    gap: 18px;
    min-height: 0;
  }

  .DiffPane {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 20px;
    border: 1px solid var(--panel-border);
    background: var(--panel-bg);
    box-shadow: var(--panel-shadow);
    contain: strict;
  }

  .DiffPaneHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(154, 173, 195, 0.12);
  }

  .DiffPaneLabel {
    font-size: 15px;
    font-weight: 600;
  }

  .DiffPaneMeta {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .DiffRows {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .DiffRow {
    display: flex;
    align-items: stretch;
    min-height: 42px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid transparent;
    background: var(--context-line);
  }

  .DiffRow--inserted {
    background: var(--insert-bg);
    border-color: rgba(95, 219, 155, 0.2);
  }

  .DiffRow--deleted {
    background: var(--delete-bg);
    border-color: rgba(255, 126, 126, 0.18);
  }

  .DiffRow--modified {
    background: var(--modified-bg);
    border-color: rgba(255, 213, 138, 0.16);
  }

  .DiffRow--empty {
    border-style: dashed;
    border-color: rgba(154, 173, 195, 0.18);
    background: rgba(244, 241, 232, 0.02);
  }

  .DiffLineNumber {
    width: 42px;
    flex-shrink: 0;
    padding: 12px 10px 10px 12px;
    text-align: right;
    color: var(--line-number);
    font-size: 12px;
    font-family: 'Iosevka Web', 'Fira Code', monospace;
    border-right: 1px solid rgba(154, 173, 195, 0.08);
  }

  .DiffContent {
    flex: 1;
    min-width: 0;
    padding: 11px 14px;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 13px;
    line-height: 1.45;
    font-family: 'Iosevka Web', 'Fira Code', monospace;
  }

  .DiffToken--added {
    color: var(--token-added);
  }

  .DiffToken--removed {
    color: var(--token-removed);
  }

  .DiffToken--changed {
    color: var(--token-changed);
    font-weight: 700;
  }

  .DiffEmptyState {
    color: var(--text-muted);
    font-style: italic;
  }

  @media (max-width: 900px) {
    .DiffPrototype {
      padding: 16px;
    }

    .DiffColumns {
      flex-direction: column;
    }
  }
`

const createElement = (tagName, className, textContent) => {
  const element = document.createElement(tagName)
  if (className) {
    element.className = className
  }
  if (typeof textContent === 'string') {
    element.textContent = textContent
  }
  return element
}

const ensureTheme = () => {
  let style = document.querySelector('style[data-diff-prototype]')
  if (!style) {
    style = createElement('style')
    style.setAttribute('data-diff-prototype', 'true')
    style.textContent = theme
    document.head.append(style)
  }
}

const renderSegments = (content, segments) => {
  for (const segment of segments) {
    const token = createElement('span', segment.kind === 'plain' ? '' : `DiffToken DiffToken--${segment.kind}`)
    token.textContent = segment.text
    content.append(token)
  }
}

const renderRow = (row, rowIndex) => {
  const classes = ['DiffRow', `DiffRow--${row.kind}`]
  const rowElement = createElement('div', classes.join(' '))
  const lineNumber = createElement('div', 'DiffLineNumber', String(rowIndex + 1))
  const content = createElement('div', 'DiffContent')

  if (row.kind === 'empty') {
    const emptyState = createElement('div', 'DiffEmptyState', row.label)
    content.append(emptyState)
  } else {
    renderSegments(content, row.segments)
  }

  rowElement.append(lineNumber, content)
  return rowElement
}

const renderPane = (label, meta, rows, paneClassName) => {
  const pane = createElement('section', `DiffPane ${paneClassName}`)
  const header = createElement('div', 'DiffPaneHeader')
  const title = createElement('div', 'DiffPaneLabel', label)
  const metaElement = createElement('div', 'DiffPaneMeta', meta)
  const rowsElement = createElement('div', 'DiffRows')

  for (let index = 0; index < rows.length; index += 1) {
    rowsElement.append(renderRow(rows[index], index))
  }

  header.append(title, metaElement)
  pane.append(header, rowsElement)
  return pane
}

export const renderDiffFixture = (mount, fixture) => {
  ensureTheme()
  document.title = fixture.title

  const beforeRows = fixture.pairs.map((pair) => pair.before)
  const afterRows = fixture.pairs.map((pair) => pair.after)

  const root = createElement('main', 'DiffPrototype')
  const hero = createElement('header', 'DiffHero')
  hero.append(
    createElement('div', 'DiffEyebrow', 'Visual Diff Prototype'),
    createElement('div', 'DiffTitle', fixture.title),
    createElement('div', 'DiffDescription', fixture.description),
  )

  const columns = createElement('section', 'DiffColumns')
  columns.append(
    renderPane(fixture.beforeLabel, 'previous revision', beforeRows, 'DiffPane--before'),
    renderPane(fixture.afterLabel, 'current revision', afterRows, 'DiffPane--after'),
  )

  root.append(hero, columns)
  mount.replaceChildren(root)
}