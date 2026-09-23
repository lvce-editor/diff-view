import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const temporaryDirectory = join(packageRoot, '.tmp')
const outputDirectory = join(temporaryDirectory, 'extension')

await rm(temporaryDirectory, { force: true, recursive: true })
await mkdir(outputDirectory, { recursive: true })

await cp(join(packageRoot, 'extension', 'extension.json'), join(outputDirectory, 'extension.json'))
await build({
  bundle: true,
  entryPoints: [join(packageRoot, 'extension', 'main.js')],
  external: ['electron', 'node:*'],
  format: 'esm',
  outfile: join(outputDirectory, 'main.js'),
  platform: 'browser',
})
