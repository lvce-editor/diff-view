const id = 'sample-source-control-provider' // TODO name it just sample-source-control-provider
const label = 'Sample Source Control'
const rootUri = ''

const IconType = {
  Modified: 0,
  Added: 1,
  Deleted: 2,
  Renamed: 3,
  Copied: 4,
  Untracked: 5,
  Ignored: 6,
  Conflict: 7,
}

const staged = Object.create(null)
const committed = Object.create(null)

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

const isCommitted = (dirent) => {
  return dirent.name in committed
}

const isChanged = (dirent) => {
  if (isCommitted(dirent)) {
    return false
  }
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
  staged[path] = true
}

const unstage = (path) => {
  delete staged[path]
}

const unstageAll = () => {
  for (const path in staged) {
    unstage(path)
  }
}

const commit = (path) => {
  committed[path] = true
  delete staged[path]
}

const commitAll = () => {
  for (const path in staged) {
    commit(path)
  }
}

const acceptInput = () => {
  commitAll()
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
