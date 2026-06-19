import type { Test } from '@lvce-editor/test-with-playwright'

const packageCount = 120

const getPackageVersion = (packageNumber: number, side: 'left' | 'right'): string => {
  if (packageNumber === packageCount) {
    return side === 'left' ? '9.9.9' : '9.10.0'
  }

  if (packageNumber % 17 === 0) {
    return side === 'left' ? `2.${packageNumber}.0` : `2.${packageNumber}.1`
  }

  return `1.${packageNumber}.0`
}

const getResolvedUrl = (packageName: string, version: string): string => {
  const tarballName = packageName.replace('/', '-')
  return `https://registry.npmjs.org/${encodeURIComponent(packageName)}/-/${tarballName}-${version}.tgz`
}

const getPackageDependency = (packageName: string, packageNumber: number, side: 'left' | 'right'): readonly [string, string] => {
  const packageId = String(packageNumber).padStart(3, '0')
  return [`${packageName}${packageId}`, `^${getPackageVersion(packageNumber, side)}`]
}

const getPackageDependencies = (packageNumber: number, side: 'left' | 'right'): Record<string, string> | undefined => {
  const dependencies: Array<readonly [string, string]> = []

  if (packageNumber > 1) {
    dependencies.push(getPackageDependency('pkg-', packageNumber - 1, side))
  }

  if (packageNumber > 4 && packageNumber % 4 === 0) {
    dependencies.push(getPackageDependency('pkg-', packageNumber - 4, side))
  }

  if (packageNumber > 5 && packageNumber % 5 === 0) {
    dependencies.push(getPackageDependency('@scope/pkg-', packageNumber - 5, side))
  }

  return dependencies.length > 0 ? Object.fromEntries(dependencies) : undefined
}

const getPackageLockContent = (side: 'left' | 'right'): string => {
  const packageEntries: Array<[string, unknown]> = [
    [
      '',
      {
        dependencies: {
          'pkg-001': '^1.1.0',
          'pkg-002': '^1.2.0',
          'pkg-003': '^1.3.0',
          'pkg-120': '^9.9.9',
        },
        name: 'complex-package-lock-demo',
        version: side === 'left' ? '1.0.0' : '1.0.1',
      },
    ],
  ]

  for (let packageNumber = 1; packageNumber <= packageCount; packageNumber++) {
    const packageId = String(packageNumber).padStart(3, '0')
    const packageName = packageNumber % 5 === 0 ? `@scope/pkg-${packageId}` : `pkg-${packageId}`
    const version = getPackageVersion(packageNumber, side)
    const packagePath = `node_modules/${packageName}`

    packageEntries.push([
      packagePath,
      {
        dependencies: getPackageDependencies(packageNumber, side),
        engines: {
          node: '>=20',
        },
        integrity: `sha512-${String(packageNumber).padStart(4, '0')}${side === 'left' ? 'aaa' : 'bbb'}`,
        license: packageNumber % 2 === 0 ? 'MIT' : 'ISC',
        resolved: getResolvedUrl(packageName, version),
        version,
      },
    ])
  }

  const packages = Object.fromEntries(packageEntries)

  return `${JSON.stringify(
    {
      lockfileVersion: 3,
      name: 'complex-package-lock-demo',
      packages,
      requires: true,
    },
    null,
    2,
  )}\n`
}

export const name = 'diff.package-lock-json-thousand-lines'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(`${tmpDir}/left/package-lock.json`, getPackageLockContent('left'))
  await FileSystem.writeFile(`${tmpDir}/right/package-lock.json`, getPackageLockContent('right'))
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left/package-lock.json`, `${tmpDir}/right/package-lock.json`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const scrollBar = Locator('.DiffScrollBar')

  await expect(beforePane).toContainText('"version": "1.0.0"')
  await expect(afterPane).toContainText('"version": "1.0.1"')
  await expect(scrollBar).toHaveCount(1)

  // await Command.execute('DiffView.handleWheel', 0, 999_999)

  // await expect(beforePane).toHaveText('"node_modules/pkg-120"')
  // await expect(afterPane).toHaveText('"node_modules/pkg-120"')
  // await expect(beforePane).toHaveText('"version": "9.9.9"')
  // await expect(afterPane).toHaveText('"version": "9.10.0"')
}
