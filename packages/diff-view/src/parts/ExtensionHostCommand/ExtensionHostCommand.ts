import * as ExtensionHostShared from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const executeCommand = (id: string, assetDir: string, platform: number, ...args: readonly any[]): Promise<void> => {
  return ExtensionHostShared.executeProvider({
    assetDir,
    event: `onCommand:${id}`,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
    platform,
  })
}
