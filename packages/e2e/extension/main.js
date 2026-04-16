const webViewProvider = {
  id: 'diff-prototype',
  async create() {},
}

export const activate = () => {
  // @ts-ignore
  vscode.registerWebViewProvider(webViewProvider)
}