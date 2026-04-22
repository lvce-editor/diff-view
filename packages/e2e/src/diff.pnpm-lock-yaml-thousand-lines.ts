import type { Test } from '@lvce-editor/test-with-playwright'

const packageCount = 181

const getPackageId = (packageNumber: number): string => {
  return String(packageNumber).padStart(3, '0')
}

const getPackageName = (packageNumber: number): string => {
  const packageId = getPackageId(packageNumber)
  if (packageNumber % 5 === 0) {
    return `@scope/pkg-${packageId}`
  }
  return `pkg-${packageId}`
}

const getPackageVersion = (packageNumber: number, side: 'left' | 'right'): string => {
  if (packageNumber === packageCount) {
    return side === 'left' ? '9.9.9' : '9.10.0'
  }

  if (packageNumber % 17 === 0) {
    return side === 'left' ? `2.${packageNumber}.0` : `2.${packageNumber}.1`
  }

  return `1.${packageNumber}.0`
}

const quoteYaml = (value: string): string => {
  return `'${value.replaceAll(`'`, `''`)}'`
}

const getPackageLockContent = (side: 'left' | 'right'): string => {
  const lines = [
    `lockfileVersion: '9.0'`,
    ``,
    `settings:`,
    `  autoInstallPeers: true`,
    `  excludeLinksFromLockfile: false`,
    ``,
    `importers:`,
    `  .:`,
    `    dependencies:`,
  ]

  for (const packageNumber of [1, 2, 17, packageCount]) {
    const packageName = getPackageName(packageNumber)
    const version = getPackageVersion(packageNumber, side)

    lines.push(`      ${quoteYaml(packageName)}:`)
    lines.push(`        specifier: ^${version}`)
    lines.push(`        version: ${version}`)
  }

  lines.push(``)
  lines.push(`packages:`)

  for (let packageNumber = 1; packageNumber <= packageCount; packageNumber++) {
    const packageName = getPackageName(packageNumber)
    const version = getPackageVersion(packageNumber, side)

    lines.push(`  ${quoteYaml(`${packageName}@${version}`)}:`)
    lines.push(`    resolution: {integrity: sha512-${String(packageNumber).padStart(4, '0')}${side === 'left' ? 'aaa' : 'bbb'}}`)
    lines.push(`    engines: {node: '>=20'}`)

    if (packageNumber % 3 === 0) {
      lines.push(`    cpu: [x64]`)
    }

    if (packageNumber > 1) {
      lines.push(`    dependencies:`)
      lines.push(`      ${quoteYaml(getPackageName(packageNumber - 1))}: ${getPackageVersion(packageNumber - 1, side)}`)

      if (packageNumber > 4 && packageNumber % 4 === 0) {
        lines.push(`      ${quoteYaml(getPackageName(packageNumber - 4))}: ${getPackageVersion(packageNumber - 4, side)}`)
      }
    }

    lines.push(``)
  }

  return `${lines.join('\n')}\n`
}

export const name = 'diff.pnpm-lock-yaml-thousand-lines'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/left/pnpm-lock.yaml`, getPackageLockContent('left'))
  await FileSystem.writeFile(`${tmpDir}/right/pnpm-lock.yaml`, getPackageLockContent('right'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left/pnpm-lock.yaml`, `${tmpDir}/right/pnpm-lock.yaml`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText(`lockfileVersion: '9.0'`)
  await expect(afterPane).toContainText(`lockfileVersion: '9.0'`)
  await expect(beforePane).toContainText(`'pkg-181':`)
  await expect(beforePane).toContainText(`version: 9.9.9`)
  await expect(afterPane).toContainText(`version: 9.10.0`)
  await expect(Locator('.ScrollBar')).toHaveCount(1)
}
