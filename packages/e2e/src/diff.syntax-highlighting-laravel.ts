import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.syntax-highlighting-laravel'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/UserController.php`,
    `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class UserController
{
    public function index(Request $request): string
    {
        $count = 1;

        return view('users.index', ['count' => $count]);
    }
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/UserController-2.php`,
    `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class UserController
{
    public function index(Request $request): string
    {
        $count = 2;

        return view('users.index', ['count' => $count]);
    }
}
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/UserController.php<->${tmpDir}/UserController-2.php`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(beforePane).toContainText('namespace App\\Http\\Controllers;')
  await expect(afterPane).toContainText('namespace App\\Http\\Controllers;')
  await expect(beforePane).toContainText('$count = 1;')
  await expect(afterPane).toContainText('$count = 2;')
  await expect(beforePane).toContainText("return view('users.index', ['count' => $count]);")
  await expect(afterPane).toContainText("return view('users.index', ['count' => $count]);")
}
