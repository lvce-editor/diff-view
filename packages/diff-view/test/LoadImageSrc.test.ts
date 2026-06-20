import { expect, jest, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { loadImageSrc } from '../src/parts/LoadImageSrc/LoadImageSrc.ts'

test('loadImageSrc converts plain file paths before reading the blob', async (): Promise<void> => {
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:plain-file')
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBuffer': async (uri: string): Promise<unknown> => {
      if (uri !== '/tmp/image.png') {
        throw new Error(`unexpected uri: ${uri}`)
      }
      return new Uint8Array([1, 2, 3])
    },
  })

  const result = await loadImageSrc('/tmp/image.png')

  expect(result).toBe('blob:plain-file')
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFileAsBuffer', '/tmp/image.png']])
  expect(createObjectUrlMock.mock.calls[0]?.[0]).toBeInstanceOf((globalThis as any).Blob)
  createObjectUrlMock.mockRestore()
})

test('loadImageSrc keeps non-file uris unchanged', async (): Promise<void> => {
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:remote-file')
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBuffer': async (uri: string): Promise<unknown> => {
      if (uri !== 'memfs:///icons/image.png') {
        throw new Error(`unexpected uri: ${uri}`)
      }
      return new Uint8Array([4, 5, 6])
    },
  })

  const result = await loadImageSrc('memfs:///icons/image.png')

  expect(result).toBe('blob:remote-file')
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFileAsBuffer', 'memfs:///icons/image.png']])
  expect(createObjectUrlMock.mock.calls[0]?.[0]).toBeInstanceOf((globalThis as any).Blob)
  createObjectUrlMock.mockRestore()
})
