import type { Test } from '@lvce-editor/test-with-playwright'

const createSortedLines = (): string[] => {
  return Array.from({ length: 100 }, (_, index) => `line ${index + 1}`)
}

const createSeededRandom = (seed: number): (() => number) => {
  let currentSeed = seed

  return () => {
    currentSeed ^= currentSeed << 13
    currentSeed ^= currentSeed >>> 17
    currentSeed ^= currentSeed << 5

    return (currentSeed >>> 0) / 4_294_967_296
  }
}

const shuffleLines = (lines: readonly string[]): string[] => {
  const shuffledLines = [...lines]
  const random = createSeededRandom(123_456_789)

  for (let index = shuffledLines.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(random() * (index + 1))
    ;[shuffledLines[index], shuffledLines[randomIndex]] = [shuffledLines[randomIndex], shuffledLines[index]]
  }

  return shuffledLines
}

export const name = 'diff.sorted-lines-and-shuffled-lines'

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const sortedLines = createSortedLines()
  const shuffledLines = shuffleLines(sortedLines)

  await FileSystem.writeFile(`${tmpDir}/file-1.txt`, `${sortedLines.join('\n')}\n`)
  await FileSystem.writeFile(`${tmpDir}/file-2.txt`, `${shuffledLines.join('\n')}\n`)
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.txt<->${tmpDir}/file-2.txt`)

  const beforeRows = Locator('.DiffPane--before .DiffRow')
  const afterRows = Locator('.DiffPane--after .DiffRow')

  await expect(beforeRows.nth(0)).toHaveText('line 1')
  await expect(beforeRows.nth(1)).toHaveText('line 2')
  await expect(beforeRows.nth(2)).toHaveText('line 3')
  await expect(afterRows.nth(0)).toHaveText(shuffledLines[0])
  await expect(afterRows.nth(1)).toHaveText(shuffledLines[1])
  await expect(afterRows.nth(2)).toHaveText(shuffledLines[2])

  await Command.execute('DiffView.handleWorkspaceChange')

  await expect(beforeRows.nth(0)).toHaveText('line 1')
  await expect(beforeRows.nth(1)).toHaveText('line 2')
  await expect(beforeRows.nth(2)).toHaveText('line 3')
  await expect(afterRows.nth(0)).toHaveText(shuffledLines[0])
  await expect(afterRows.nth(1)).toHaveText(shuffledLines[1])
  await expect(afterRows.nth(2)).toHaveText(shuffledLines[2])
}
