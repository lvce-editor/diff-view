import { PlainMessagePortRpc } from '@lvce-editor/rpc'

export const handleMessagePort = async (port: any): Promise<void> => {
  await PlainMessagePortRpc.create({
    commandMap: {},
    messagePort: port,
  })
}
