import type { Test } from '@lvce-editor/test-with-playwright'

type Variant = 'before' | 'after'

const getComponentName = (variant: Variant): string => (variant === 'before' ? 'LegacyProjectSettingsPanel' : 'ProjectSettingsPanel')

const getPanelClassName = (variant: Variant): string =>
  variant === 'before' ? 'project-settings-panel project-settings-panel--legacy' : 'project-settings-panel project-settings-panel--modern'

const getSectionTitle = (index: number, variant: Variant): string => {
  if (index === 1) {
    return variant === 'before' ? 'Session overview' : 'Session overview with live sync'
  }

  if (index === 31) {
    return variant === 'before' ? 'Workflow controls' : 'Workflow controls with policy checks'
  }

  if (index === 61) {
    return variant === 'before' ? 'Audit timeline' : 'Audit timeline with annotations'
  }

  return `Operational section ${index}`
}

const getSectionSummary = (index: number, variant: Variant): string =>
  `The ${variant === 'before' ? 'legacy' : 'modern'} React section ${index} keeps the panel aligned with the current editor state.`

const getSectionMode = (index: number, variant: Variant): string => {
  if (index % 2 === 0) {
    return variant === 'before' ? 'Read-only' : 'Editable'
  }

  return variant === 'before' ? 'Queued' : 'Live'
}

const getSectionButton = (index: number, variant: Variant): string => {
  if (index === 61) {
    return variant === 'before' ? 'Review legacy audit' : 'Review annotated audit'
  }

  return variant === 'before' ? 'Inspect legacy section' : 'Inspect modern section'
}

const createSectionBlock = (index: number, variant: Variant): string => {
  const sectionTitle = getSectionTitle(index, variant)
  const sectionSummary = getSectionSummary(index, variant)
  const sectionMode = getSectionMode(index, variant)
  const sectionButton = getSectionButton(index, variant)
  const sectionTone = variant === 'before' ? 'legacy' : 'modern'

  return [
    `      <section className="project-settings-panel__section" data-section="${index}">`,
    '        <header className="project-settings-panel__section-header">',
    `          <h2>${sectionTitle}</h2>`,
    `          <p>${sectionSummary}</p>`,
    '        </header>',
    '        <dl className="project-settings-panel__facts">',
    '          <div>',
    '            <dt>Section</dt>',
    `            <dd>${index}</dd>`,
    '          </div>',
    '          <div>',
    '            <dt>Mode</dt>',
    `            <dd>${sectionMode}</dd>`,
    '          </div>',
    '          <div>',
    '            <dt>Tone</dt>',
    `            <dd>${sectionTone}</dd>`,
    '          </div>',
    '        </dl>',
    `        <button type="button" onClick={() => onSelectSection(${index})}>`,
    `          ${sectionButton}`,
    '        </button>',
    '      </section>',
  ].join('\n')
}

const getComponentContent = (variant: Variant): string => {
  const sections: string[] = []

  for (let index = 1; index <= 61; index++) {
    sections.push(createSectionBlock(index, variant))
  }

  return [
    "import { useMemo, useState } from 'react'",
    '',
    'type ProjectSettingsPanelProps = {',
    '  readonly projectName: string',
    '  readonly updatedAt: string',
    '}',
    '',
    `export function ${getComponentName(variant)}({ projectName, updatedAt }: ProjectSettingsPanelProps) {`,
    '  const [selectedSection, setSelectedSection] = useState(1)',
    '  const visibleSections = useMemo(() => Array.from({ length: 61 }, (_, index) => index + 1), [])',
    '',
    '  const onSelectSection = (index: number) => {',
    '    setSelectedSection(index)',
    '  }',
    '',
    '  return (',
    `    <article className="${getPanelClassName(variant)}">`,
    '      <header className="project-settings-panel__header">',
    `        <h1>${variant === 'before' ? 'Legacy project settings' : 'Project settings'}</h1>`,
    `        <p>${variant === 'before' ? 'A legacy React component with a long, nested diff.' : 'A modern React component with a long, nested diff.'}</p>`,
    '      </header>',
    '      <section className="project-settings-panel__meta">',
    '        <dl>',
    '          <div>',
    '            <dt>Project</dt>',
    '            <dd>{projectName}</dd>',
    '          </div>',
    '          <div>',
    '            <dt>Updated</dt>',
    '            <dd>{updatedAt}</dd>',
    '          </div>',
    '          <div>',
    '            <dt>Selected section</dt>',
    '            <dd>{selectedSection}</dd>',
    '          </div>',
    '        </dl>',
    '      </section>',
    '      <div className="project-settings-panel__sections">',
    ...sections,
    '      </div>',
    '      <footer className="project-settings-panel__footer">',
    '        <span>Visible sections</span>',
    '        <span>{visibleSections.length}</span>',
    '      </footer>',
    '    </article>',
    '  )',
    '}',
    '',
  ].join('\n')
}

export const name = 'diff.thousand-lines-react-component'

export const skip = 1

export const test: Test = async ({ Command, DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left.tsx`, getComponentContent('before'))
  await FileSystem.writeFile(`${tmpDir}/right.tsx`, getComponentContent('after'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.tsx`, `${tmpDir}/right.tsx`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(Locator('.ScrollBar')).toHaveCount(1)
  await expect(beforePane).toContainText('Legacy project settings')
  await expect(afterPane).toContainText('Project settings')
  await expect(beforePane).toContainText('legacy React section 1')
  await expect(afterPane).toContainText('modern React section 1')

  await Command.execute('DiffView.handleWheel', 0, 100_000)

  await expect(beforePane).toContainText('Audit timeline')
  await expect(afterPane).toContainText('Audit timeline with annotations')
  await expect(beforePane).toContainText('legacy React section 61')
  await expect(afterPane).toContainText('modern React section 61')
}
