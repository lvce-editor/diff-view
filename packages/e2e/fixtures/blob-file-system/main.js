import { activate as activateExtensionApi, registerFileSystemProvider } from '@lvce-editor/api'

const fileSystemProvider = {
  id: 'blob-fixture',
  async readFile(uri) {
    if (uri.endsWith('/empty.txt')) {
      return new Blob([])
    }
    return new Blob(['remote 😀 content'])
  },
}

const main = async () => {
  await activateExtensionApi()
  registerFileSystemProvider(fileSystemProvider)
}

main().catch(console.error)
