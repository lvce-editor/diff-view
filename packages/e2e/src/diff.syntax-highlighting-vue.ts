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

  const contentLeft = Locator('.DiffPane--before .DiffEditorRows')
  const contentRight = Locator('.DiffPane--after .DiffEditorRows')
  const keywordTokensLeft = Locator('.DiffPane--before .Token.Keyword')
  const keywordTokensRight = Locator('.DiffPane--after .Token.Keyword')
  const numericTokensLeft = Locator('.DiffPane--before .Token.Numeric')
  const numericTokensRight = Locator('.DiffPane--after .Token.Numeric')

  await expect(contentLeft).toContainText('<template>')
  await expect(contentRight).toContainText('<template>')
  await expect(contentLeft).toContainText('const count = 1')
  await expect(contentRight).toContainText('const count = 2')
  await expect(keywordTokensLeft).toHaveCount(1)
  await expect(keywordTokensRight).toHaveCount(1)
  await expect(numericTokensLeft).toHaveCount(1)
  await expect(numericTokensRight).toHaveCount(1)
}
