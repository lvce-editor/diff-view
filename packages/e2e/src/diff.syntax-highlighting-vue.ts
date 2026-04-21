import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-vue'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file-1.vue`,
    `<template>
  <button>{{ count }}</button>
</template>

<script setup>
const count = 1
</script>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/file-2.vue`,
    `<template>
  <button>{{ count }}</button>
</template>

<script setup>
const count = 2
</script>
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/file-1.vue<->${tmpDir}/file-2.vue`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')
  const keywordTokensLeft = Locator('.DiffEditorContentLeft .Token.Keyword')
  const keywordTokensRight = Locator('.DiffEditorContentRight .Token.Keyword')
  const numericTokensLeft = Locator('.DiffEditorContentLeft .Token.Numeric')
  const numericTokensRight = Locator('.DiffEditorContentRight .Token.Numeric')

  await expect(contentLeft).toContainText('<template>')
  await expect(contentRight).toContainText('<template>')
  await expect(contentLeft).toContainText('const count = 1')
  await expect(contentRight).toContainText('const count = 2')
  await expect(keywordTokensLeft).toHaveCount(1)
  await expect(keywordTokensRight).toHaveCount(1)
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
}
