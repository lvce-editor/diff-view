import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.json-array-object-insertion'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()

  await FileSystem.writeFile(
    `${tmpDir}/left.json`,
    `{
  "items": [
    {
      "id": 1,
      "name": "alpha",
      "meta": {
        "enabled": true
      }
    },
    {
      "id": 3,
      "name": "charlie",
      "meta": {
        "enabled": false
      }
    }
  ]
}
`,
  )

  await FileSystem.writeFile(
    `${tmpDir}/right.json`,
    `{
  "items": [
    {
      "id": 1,
      "name": "alpha",
      "meta": {
        "enabled": true
      }
    },
    {
      "id": 2,
      "name": "bravo",
      "meta": {
        "enabled": false
      }
    },
    {
      "id": 3,
      "name": "charlie",
      "meta": {
        "enabled": false
      }
    }
  ]
}
`,
  )

  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/left.json`, `${tmpDir}/right.json`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const insertedRows = Locator('.DiffEditorContentRight .DiffRow--inserted')

  await expect(beforePane).toContainText('"id": 1,')
  await expect(afterPane).toContainText('"id": 2,')
  await expect(afterPane).toContainText('"name": "bravo"')
  await expect(insertedRows).toHaveCount(7)
  await expect(insertedRows.nth(0)).toHaveText('{')
  await expect(insertedRows.nth(1)).toHaveText('"id": 2,')
  await expect(insertedRows.nth(2)).toHaveText('"name": "bravo",')
  await expect(insertedRows.nth(3)).toHaveText('"meta": {')
  await expect(insertedRows.nth(4)).toHaveText('"enabled": false')
  await expect(insertedRows.nth(5)).toHaveText('}')
  await expect(insertedRows.nth(6)).toHaveText('}')
}
