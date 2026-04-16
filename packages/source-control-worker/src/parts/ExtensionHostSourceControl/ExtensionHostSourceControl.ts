import * as Assert from '@lvce-editor/assert'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const acceptInput = async (providerId: string, text: string, assetDir: string, platform: number): Promise<void> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlAcceptInput,
    params: [providerId, text],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getChangedFiles = (providerId: string, assetDir: string, platform: number): Promise<readonly any[]> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetChangedFiles,
    params: [providerId],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}
export const getFileDecorations = (providerId: string, uris: readonly string[], assetDir: string, platform: number): Promise<readonly any[]> => {
  Assert.string(assetDir)
  Assert.number(platform)
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFileDecorations,
    params: [providerId, uris],
    platform,
  })
}

export const getFileBefore = (providerId: string, path: string, assetDir: string, platform: number): Promise<any> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFileBefore,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getGroups = (providerId: string, path: string, assetDir: string, platform: number): Promise<any> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetGroups,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const add = (providerId: string, path: string, assetDir: string, platform: number): Promise<void> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlAdd,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const discard = (providerId: string, path: string, assetDir: string, platform: number): Promise<void> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlDiscard,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getEnabledProviderIds = (scheme: string, root: string, assetDir: string, platform: number): Promise<readonly string[]> => {
  return ExecuteProvider.executeProvider({
    assetDir,
    event: `onSourceControl:${scheme}`,
    method: ExtensionHostCommandType.SourceControlGetEnabledProviderIds,
    params: [scheme, root],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getIconDefinitions = async (providerId: string): Promise<readonly string[]> => {
  // @ts-ignore
  const result = await ExtensionHost.invoke('ExtensionHostSourceControl.getIconDefinitions', providerId)
  return result
}
