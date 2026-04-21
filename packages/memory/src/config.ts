import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 465_000

export const instantiations = 8000

export const instantiationsPath = join(root, 'packages', 'diff-view')

export const workerPath = join(root, '.tmp/dist/dist/diffViewWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../e2e/node_modules/playwright/index.mjs')
