import * as Assert from '@lvce-editor/assert'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const activateByEvent = (event: string, assetDir: string, platform: number): Promise<void> => {
  Assert.string(event)
  Assert.string(assetDir)
  Assert.number(platform)
  return RendererWorker.activateByEvent(event, assetDir, platform)
}
