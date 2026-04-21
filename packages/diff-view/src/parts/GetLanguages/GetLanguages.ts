import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { SyntaxLanguageContribution } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'

let cachedAssetDir = ''
let cachedPlatform = -1
let cachedLanguages: readonly SyntaxLanguageContribution[] = []

export const getLanguages = async (platform: number, assetDir: string): Promise<readonly SyntaxLanguageContribution[]> => {
  if (cachedPlatform === platform && cachedAssetDir === assetDir) {
    return cachedLanguages
  }
  try {
    const languages = await ExtensionManagementWorker.invoke('Extensions.getLanguages', platform, assetDir)
    if (!Array.isArray(languages)) {
      return []
    }
    cachedPlatform = platform
    cachedAssetDir = assetDir
    cachedLanguages = languages as readonly SyntaxLanguageContribution[]
    return cachedLanguages
  } catch {
    return []
  }
}
