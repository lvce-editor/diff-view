import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-tsx-react'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.tsx`,
    `import type { ReactNode } from 'react'

type CardProps = {
  readonly title: string
  readonly subtitle: string
}

export function Card({ title, subtitle }: CardProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const items = useMemo(() => [title, subtitle].filter(Boolean), [title, subtitle])

  return (
    <article className="card">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.tsx`,
    `import type { ReactNode } from 'react'

type CardProps = {
  readonly title: string
  readonly description: string
}

export function Card({ title, description }: CardProps): ReactNode {
  const [isOpen, setIsOpen] = useState(true)
  const items = useMemo(() => [title, description].filter(Boolean), [title, description])

  return (
    <article className="card card--selected">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Open'}
      </button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.tsx`, `${tmpDir}/right.tsx`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('readonly subtitle: string')
  await expect(afterPane).toContainText('readonly description: string')
  await expect(beforePane).toContainText('className="card"')
  await expect(afterPane).toContainText('className="card card--selected"')
  await expect(beforePane).toContainText("{isOpen ? 'Collapse' : 'Expand'}")
  await expect(afterPane).toContainText("{isOpen ? 'Collapse' : 'Open'}")
  await expect(beforePane.locator('.Token.KeywordImport')).toHaveCount(3)
  await expect(afterPane.locator('.Token.KeywordImport')).toHaveCount(3)
  await expect(beforePane.locator('.Token.KeywordFunction')).toHaveCount(0)
  await expect(afterPane.locator('.Token.KeywordFunction')).toHaveCount(0)
  await expect(beforePane.locator('.Token.String')).toHaveCount(5)
  await expect(afterPane.locator('.Token.String')).toHaveCount(5)
}
