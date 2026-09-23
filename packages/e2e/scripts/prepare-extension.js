import { mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const extensionDirectory = join(packageRoot, 'extension')
const temporaryDirectory = join(extensionDirectory, '.tmp')

await rm(temporaryDirectory, { force: true, recursive: true })
await mkdir(temporaryDirectory, { recursive: true })
await build({
  bundle: true,
  entryPoints: [join(packageRoot, 'extension', 'main.js')],
  external: ['electron', 'node:*'],
  format: 'esm',
  outfile: join(temporaryDirectory, 'main.js'),
  platform: 'browser',
})
