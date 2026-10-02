import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-tsx-react'
const openBrace = '{'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.tsx`,
    `import type { ReactNode } from 'react'

type CardProps = {
  readonly title: string
  readonly subtitle: string
}

export function Card(${openBrace} title, subtitle }: CardProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const items = useMemo(() => [title, subtitle].filter(Boolean), [title, subtitle])

  return (
    <article className="card">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
      <ul>
        {items.map((item) => (
          <li key=${openBrace}item}>${openBrace}item}</li>
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

export function Card(${openBrace} title, description }: CardProps): ReactNode {
  const [isOpen, setIsOpen] = useState(true)
  const items = useMemo(() => [title, description].filter(Boolean), [title, description])

  return (
    <article className="card card--selected">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Open'}
      </button>
      <ul>
        {items.map((item) => (
          <li key=${openBrace}item}>${openBrace}item}</li>
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
  const beforeKeywordImports = beforePane.locator('.Token.KeywordImport')
  const afterKeywordImports = afterPane.locator('.Token.KeywordImport')
  const beforeKeywordFunctions = beforePane.locator('.Token.KeywordFunction')
  const afterKeywordFunctions = afterPane.locator('.Token.KeywordFunction')
  const beforeStrings = beforePane.locator('.Token.String')
  const afterStrings = afterPane.locator('.Token.String')

  await expect(beforePane).toContainText('readonly subtitle: string')
  await expect(afterPane).toContainText('readonly description: string')
  await expect(beforePane).toContainText('className="card"')
  await expect(afterPane).toContainText('className="card card--selected"')
  await expect(beforePane).toContainText("{isOpen ? 'Collapse' : 'Expand'}")
  await expect(afterPane).toContainText("{isOpen ? 'Collapse' : 'Open'}")
  await expect(beforeKeywordImports).toHaveCount(3)
  await expect(afterKeywordImports).toHaveCount(3)
  await expect(beforeKeywordFunctions).toHaveCount(0)
  await expect(afterKeywordFunctions).toHaveCount(0)
  await expect(beforeStrings).toHaveCount(5)
  await expect(afterStrings).toHaveCount(5)
}
