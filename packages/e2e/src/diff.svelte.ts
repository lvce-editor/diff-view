import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.svelte'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/left.svelte`,
    `<script>
  export let name = 'world'
</script>

<h1>Hello {name}</h1>
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/right.svelte`,
    `<script>
  export let name = 'svelte'
</script>

<h1>Hello {name}</h1>
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/left.svelte<->${tmpDir}/right.svelte`)

  const beforePane = Locator('.DiffPane--before')
  const afterPane = Locator('.DiffPane--after')

  await expect(beforePane).toContainText(`export let name = 'world'`)
  await expect(afterPane).toContainText(`export let name = 'svelte'`)
  await expect(beforePane).toContainText('<h1>Hello {name}</h1>')
  await expect(afterPane).toContainText('<h1>Hello {name}</h1>')
  await expect(Locator('.DiffToken--changed')).toHaveCount(2)
}
