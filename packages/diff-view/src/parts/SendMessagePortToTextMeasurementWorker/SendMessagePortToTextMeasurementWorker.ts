import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToTextMeasurementWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToTextMeasurementWorker(port)
}
