import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.rust-complex'

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.rs`,
    `use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Config {
    pub retries: u8,
    pub timeout_ms: u64,
}

pub fn build_headers(enabled: bool) -> HashMap<&'static str, String> {
    let mut headers = HashMap::new();
    headers.insert("x-mode", "legacy".to_string());

    if enabled {
        headers.insert("x-retries", 3.to_string());
    }

    headers
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.rs`,
    `use std::collections::{BTreeMap, HashMap};

#[derive(Debug, Clone)]
pub struct Config {
    pub retries: u8,
    pub timeout_ms: u64,
    pub profile: &'static str,
}

pub fn build_headers(config: &Config, enabled: bool) -> BTreeMap<&'static str, String> {
    let mut headers = BTreeMap::new();
    headers.insert("x-mode", config.profile.to_string());

    if enabled {
        headers.insert("x-retries", config.retries.to_string());
        headers.insert("x-timeout", config.timeout_ms.to_string());
    }

    headers
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.rs`, `${tmpDir}/after.rs`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText(`pub fn build_headers(enabled: bool) -> HashMap<&'static str, String> {`)
  await expect(afterPane).toContainText(`pub fn build_headers(config: &Config, enabled: bool) -> BTreeMap<&'static str, String> {`)
  await expect(beforePane).toContainText(`headers.insert("x-mode", "legacy".to_string());`)
  await expect(afterPane).toContainText(`headers.insert("x-mode", config.profile.to_string());`)
  await expect(beforePane).toContainText(`headers.insert("x-retries", 3.to_string());`)
  await expect(afterPane).toContainText(`headers.insert("x-timeout", config.timeout_ms.to_string());`)
  await expect(deletedRows).toHaveCount(7)
  await expect(insertedRows).toHaveCount(9)
}
