import { execa } from 'execa'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { extname, join } from 'node:path'
import { root } from './root.ts'

interface CliOptions {
  readonly commitHash: string
  readonly outputDir: string
  readonly projectName: string
  readonly repoUrl: string
}

interface DiffFileCase {
  readonly afterContent: string
  readonly afterFileName: string
  readonly beforeContent: string
  readonly beforeFileName: string
  readonly caseName: string
}

const projectConfigs = {
  diff2html: {
    projectName: 'diff2html',
    sourceFile: 'src/__tests__/diff-parser-tests.ts',
  },
} as const

const parseArgs = (argv: Array<string>): CliOptions => {
  let repoUrl = 'https://github.com/rtfpessoa/diff2html.git'
  let commitHash = ''
  let projectName = 'diff2html'
  let outputDir = join(root, 'packages', 'e2e', 'src', 'generated', projectName)

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]

    if (argument === '--repo-url') {
      repoUrl = argv[++index] ?? repoUrl
      continue
    }

    if (argument === '--commit-hash') {
      commitHash = argv[++index] ?? commitHash
      continue
    }

    if (argument === '--project-name') {
      projectName = argv[++index] ?? projectName
      outputDir = join(root, 'packages', 'e2e', 'src', 'generated', projectName)
      continue
    }

    if (argument === '--output-dir') {
      outputDir = argv[++index] ?? outputDir
      continue
    }
  }

  if (!commitHash) {
    throw new Error('Missing required --commit-hash')
  }

  if (!Object.hasOwn(projectConfigs, projectName)) {
    throw new Error(`Unsupported project: ${projectName}`)
  }

  return {
    commitHash,
    outputDir,
    projectName,
    repoUrl,
  }
}

const runGit = async (cwd: string, args: Array<string>): Promise<void> => {
  await execa('git', args, {
    cwd,
    stdio: 'inherit',
  })
}

const evaluateStringExpression = (expression: string): string => {
  return Function(`"use strict"; return (${expression});`)() as string
}

const extractItBlocks = (source: string): Array<{ body: string; name: string }> => {
  const blocks: Array<{ body: string; name: string }> = []
  const pattern = /\bit\(\s*(['"`])([^'"`]+)\1\s*,\s*\(\)\s*=>\s*\{/g

  for (;;) {
    const match = pattern.exec(source)

    if (!match) {
      break
    }

    const bodyStart = pattern.lastIndex
    const bodyEnd = source.indexOf('\n  });', bodyStart)

    if (bodyEnd === -1) {
      continue
    }

    blocks.push({
      body: source.slice(bodyStart, bodyEnd),
      name: match[2],
    })
  }

  return blocks
}

const extractDiffExpression = (body: string): string | undefined => {
  const match = body.match(/const\s+diffs?\s*=\s*([\s\S]*?);\n\s*(?:const\s+result|expect\()/)

  if (!match) {
    return undefined
  }

  return match[1].trim()
}

const getFileName = (filePath: string, side: 'before' | 'after', index: number): string => {
  const cleanPath = filePath.replace(/^[ab]\//, '')
  const extension = extname(cleanPath) || '.txt'
  const relativePath = cleanPath.slice(0, cleanPath.length - extension.length)
  const flattenedPath = relativePath.replace(/[\\/]+/g, '-')
  const sanitizedPath = flattenedPath.replace(/[^a-zA-Z0-9._-]+/g, '-')
  const suffix = index > 1 ? `-${index}` : ''

  return `${sanitizedPath}.${side}${suffix}${extension}`
}

const parseUnifiedDiff = (diffText: string, caseName: string): Array<DiffFileCase> => {
  const lines = diffText.replace(/\r\n/g, '\n').split('\n')
  const cases: Array<DiffFileCase> = []
  let fileIndex = 0
  let currentOldFileName = ''
  let currentNewFileName = ''
  let beforeLines: Array<string> = []
  let afterLines: Array<string> = []
  let isInHunk = false

  const flush = (): void => {
    if (!currentOldFileName && !currentNewFileName) {
      return
    }

    if (beforeLines.length === 0 && afterLines.length === 0) {
      return
    }

    fileIndex += 1
    const beforeFileName = getFileName(currentOldFileName || currentNewFileName, 'before', fileIndex)
    const afterFileName = getFileName(currentNewFileName || currentOldFileName, 'after', fileIndex)
    const normalizedCaseName = caseName.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    cases.push({
      afterContent: afterLines.join('\n'),
      afterFileName,
      beforeContent: beforeLines.join('\n'),
      beforeFileName,
      caseName: fileIndex === 1 ? normalizedCaseName : `${normalizedCaseName}-${fileIndex}`,
    })
  }

  for (const line of lines) {
    if (line.startsWith('diff --git ')) {
      flush()
      currentOldFileName = ''
      currentNewFileName = ''
      beforeLines = []
      afterLines = []
      isInHunk = false
      continue
    }

    if (line.startsWith('--- ')) {
      currentOldFileName = line.slice(4).split(/\s+/)[0] ?? ''
      continue
    }

    if (line.startsWith('+++ ')) {
      currentNewFileName = line.slice(4).split(/\s+/)[0] ?? ''
      continue
    }

    if (line.startsWith('@@ ')) {
      isInHunk = true
      continue
    }

    if (!isInHunk || line.startsWith('\\ No newline at end of file')) {
      continue
    }

    if (line.startsWith('-')) {
      beforeLines.push(line.slice(1))
      continue
    }

    if (line.startsWith('+')) {
      afterLines.push(line.slice(1))
      continue
    }

    if (line.startsWith(' ')) {
      const content = line.slice(1)
      beforeLines.push(content)
      afterLines.push(content)
    }
  }

  flush()
  return cases
}

const extractDiff2HtmlCases = async (sourceFilePath: string): Promise<Array<DiffFileCase>> => {
  const source = await readFile(sourceFilePath, 'utf8')
  const cases: Array<DiffFileCase> = []

  for (const block of extractItBlocks(source)) {
    const diffExpression = extractDiffExpression(block.body)

    if (!diffExpression) {
      continue
    }

    const diffText = evaluateStringExpression(diffExpression)
    cases.push(...parseUnifiedDiff(diffText, block.name))
  }

  return cases
}

const createTestFile = (projectName: string, generatedCase: DiffFileCase): string => {
  return `// cspell:disable
import type { Test } from '@lvce-editor/test-with-playwright'

export const name = '${projectName}.${generatedCase.caseName}'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    \`${'${tmpDir}'}/${generatedCase.beforeFileName}\`,
    ${JSON.stringify(generatedCase.beforeContent)},
  )
  await FileSystem.writeFile(
    \`${'${tmpDir}'}/${generatedCase.afterFileName}\`,
    ${JSON.stringify(generatedCase.afterContent)},
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(\`diff://${'${tmpDir}'}/${generatedCase.beforeFileName}<->${'${tmpDir}'}/${generatedCase.afterFileName}\`)

  const contentLeft = Locator('.DiffEditorContentLeft')
  const contentRight = Locator('.DiffEditorContentRight')

  await expect(contentLeft).toContainText(${JSON.stringify(generatedCase.beforeContent)})
  await expect(contentRight).toContainText(${JSON.stringify(generatedCase.afterContent)})
}

// cspell:enable
`
}

const writeGeneratedTests = async (outputDir: string, projectName: string, cases: Array<DiffFileCase>): Promise<void> => {
  await rm(outputDir, { force: true, recursive: true })
  await mkdir(outputDir, { recursive: true })

  for (const generatedCase of cases) {
    const fileName = `${generatedCase.caseName}.ts`
    const filePath = join(outputDir, fileName)
    await writeFile(filePath, createTestFile(projectName, generatedCase))
  }
}

const main = async (): Promise<void> => {
  const options = parseArgs(process.argv.slice(2))
  const cloneDir = await mkdtemp(join(tmpdir(), 'diff-view-generated-e2e-'))
  const repoDir = join(cloneDir, 'repo')

  try {
    await runGit(cloneDir, ['clone', options.repoUrl, 'repo'])
    await runGit(repoDir, ['checkout', options.commitHash])

    const config = projectConfigs[options.projectName as keyof typeof projectConfigs]
    const sourceFilePath = join(repoDir, config.sourceFile)
    const cases = await extractDiff2HtmlCases(sourceFilePath)

    if (cases.length === 0) {
      throw new Error(`No diff cases found in ${config.sourceFile}`)
    }

    await writeGeneratedTests(options.outputDir, options.projectName, cases)
    console.log(`Generated ${cases.length} e2e tests in ${options.outputDir}`)
  } finally {
    await rm(cloneDir, { force: true, recursive: true })
  }
}

await main()
