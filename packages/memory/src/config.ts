import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 465_000

export const instantiations = 3000

export const instantiationsPath = join(root, 'packages', 'source-control-worker')

export const workerPath = join(root, '.tmp/dist/dist/sourceControlWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../e2e/node_modules/playwright/index.mjs')
