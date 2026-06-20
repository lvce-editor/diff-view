import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { SyntaxLanguageContribution } from '../GetSyntaxLanguage/GetSyntaxLanguage.ts'

const languageCache = {
  assetDir: '',
  languages: [] as readonly SyntaxLanguageContribution[],
  platform: -1,
}

export const getLanguages = async (platform: number, assetDir: string): Promise<readonly SyntaxLanguageContribution[]> => {
  if (languageCache.platform === platform && languageCache.assetDir === assetDir) {
    return languageCache.languages
  }
  try {
    const languages = await ExtensionManagementWorker.invoke('Extensions.getLanguages', platform, assetDir)
    if (!Array.isArray(languages)) {
      return []
    }
    languageCache.platform = platform
    languageCache.assetDir = assetDir
    languageCache.languages = languages as readonly SyntaxLanguageContribution[]
    return languageCache.languages
  } catch {
    return []
  }
}
