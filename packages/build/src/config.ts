import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

export const threshold = 530_000

export const instantiations = 8000

export const instantiationsPath = join(root, 'packages', 'diff-view')

export const workerPath = join(root, '.tmp', 'dist', 'dist', 'diffViewWorkerMain.js')

export const playwrightPath = pathToFileURL(join(root, 'packages', 'e2e', 'node_modules', 'playwright', 'index.mjs')).toString()
