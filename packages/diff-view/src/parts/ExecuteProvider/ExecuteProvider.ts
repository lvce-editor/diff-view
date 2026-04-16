import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'

export const executeProvider = async ({
  assetDir,
  event,
  method,
  params,
  platform,
}: {
  readonly event: string
  readonly method: string
  readonly params: readonly any[]
  readonly platform: number
  readonly assetDir: string
}): Promise<any> => {
  await ActivateByEvent.activateByEvent(event, assetDir, platform)
  // @ts-ignore
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
