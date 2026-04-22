import { expect, jest, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { loadImageSrc } from '../src/parts/LoadImageSrc/LoadImageSrc.ts'

test('loadImageSrc converts plain file paths before reading the blob', async (): Promise<void> => {
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:plain-file')
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBlob': async (uri: string): Promise<unknown> => {
      if (uri !== 'file:///tmp/image.png') {
        throw new Error(`unexpected uri: ${uri}`)
      }
      return { uri }
    },
  })

  const result = await loadImageSrc('/tmp/image.png')

  expect(result).toBe('blob:plain-file')
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFileAsBlob', 'file:///tmp/image.png']])
  expect(createObjectUrlMock).toHaveBeenCalledWith({ uri: 'file:///tmp/image.png' })
  createObjectUrlMock.mockRestore()
})

test('loadImageSrc keeps non-file uris unchanged', async (): Promise<void> => {
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:remote-file')
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBlob': async (uri: string): Promise<unknown> => {
      if (uri !== 'memfs:///icons/image.png') {
        throw new Error(`unexpected uri: ${uri}`)
      }
      return { uri }
    },
  })

  const result = await loadImageSrc('memfs:///icons/image.png')

  expect(result).toBe('blob:remote-file')
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFileAsBlob', 'memfs:///icons/image.png']])
  expect(createObjectUrlMock).toHaveBeenCalledWith({ uri: 'memfs:///icons/image.png' })
  createObjectUrlMock.mockRestore()
})
