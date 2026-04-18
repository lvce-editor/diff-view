import * as Create2 from '../Create2/Create2.ts'
import * as Initialize from '../Initialize/Initialize.ts'

export const commandMap = {
  'DiffView.initialize': Initialize.initialize,
  'Initialize.initialize': Initialize.initialize,
  'SourceControl.create2': Create2.create2,
}
