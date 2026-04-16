const id = 'sample-source-control'
const label = 'Sample Source Control'
const rootUri = ''

const iconRoot = new URL('./icons/dark', import.meta.url).toString()

const IconType = {
  Modified: `${iconRoot}/status-modified.svg`,
  Added: `${iconRoot}/status-added.svg`,
  Deleted: `${iconRoot}/status-deleted.svg`,
  Renamed: `${iconRoot}/status-renamed.svg`,
  Copied: `${iconRoot}/status-copied.svg`,
  Untracked: `${iconRoot}/status-untracked.svg`,
  Ignored: `${iconRoot}/status-ignored.svg`,
  Conflict: `${iconRoot}/status-conflict.svg`,
}

const staged = Object.create(null)

const renamedFilesMap = Object.create(null)

const toChangedItem = (dirent, root) => {
  const absoluteUri = `${root}/${dirent.name}`
  if (absoluteUri in renamedFilesMap) {
    return {
      file: dirent.name,
      icon: IconType.Renamed,
      iconTitle: '',
      type: 8,
    }
  }
  return {
    file: dirent.name,
    icon: IconType.Untracked,
    iconTitle: '',
    type: 8,
  }
}

const toStagedItem = (dirent, root) => {
  const absoluteUri = `${root}/${dirent.name}`
  if (absoluteUri in renamedFilesMap) {
    return {
      file: dirent.name,
      icon: IconType.Renamed,
      iconTitle: '',
      type: 8,
    }
  }
  return {
    file: dirent.name,
    icon: IconType.Untracked,
    iconTitle: '',
    type: 8,
  }
}

const isStaged = (dirent) => {
  return dirent.name in staged
}

const isChanged = (dirent) => {
  if (isStaged(dirent)) {
    return false
  }
  return true
}

const getGroups = async () => {
  const root = vscode.getWorkspaceFolder()
  const dirents = await vscode.readDirWithFileTypes(root)
  const changed = dirents.filter(isChanged).map((item) => toChangedItem(item, root))
  const staged = dirents.filter(isStaged).map((item) => toStagedItem(item, root))
  const groups = [
    {
      id: 'merge',
      label: 'Merge',
      items: [],
    },
    {
      id: 'index',
      label: 'Staged Changes',
      items: staged,
    },
    {
      id: 'working-tree',
      label: 'Changes',
      items: changed,
    },
    {
      id: 'untracked',
      label: 'Changes',
      items: [],
    },
  ]
  return groups
}

const getChangedFiles = () => {
  if (!rootUri) {
    return []
  }
}

const stage = (path) => {
  throw new TypeError(`x is not a function`)
}

const unstage = (path) => {
  delete staged[path]
}

const unstageAll = () => {
  for (const path in staged) {
    unstage(path)
  }
}

const acceptInput = () => {
  // No-op for this sample provider
}

const getFileBefore = (path) => {
  // Return empty string for this sample provider
  return ''
}

const dispose = () => {}

const isActive = () => {
  return true
}

const sampleSourceControlProvider = {
  id,
  label,
  rootUri,
  getGroups,
  getChangedFiles,
  stage,
  unstage,
  acceptInput,
  getFileBefore,
  dispose,
  isActive,
}

const rename = (oldUri, newUri) => {
  renamedFilesMap[newUri] = oldUri
}

export function activate(context) {
  // @ts-ignore
  vscode.registerSourceControlProvider(sampleSourceControlProvider)
  // @ts-ignore
  vscode.registerCommand({
    id: 'sampleSourceControl.stage',
    execute: stage,
  })
  // @ts-ignore
  vscode.registerCommand({
    id: 'sampleSourceControl.unstage',
    execute: unstage,
  })
  // @ts-ignore
  vscode.registerCommand({
    id: 'sampleSourceControl.unstageAll',
    execute: unstageAll,
  })
  // @ts-ignore
  vscode.registerCommand({
    id: 'sampleSourceControl.rename',
    execute: rename,
  })
}

export function deactivate() {}
