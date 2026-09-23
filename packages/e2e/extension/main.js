const webViewProvider = {
  id: 'diff-prototype',
  async create() {},
}

const fileSystemProvider = {
  id: 'blob-fixture',
  async readFile(uri) {
    if (uri.endsWith('/empty.txt')) {
      return new Blob([])
    }
    return new Blob(['remote 😀 content'])
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerWebViewProvider(webViewProvider)
  // @ts-ignore
  vscode.registerFileSystemProvider(fileSystemProvider)
}
