import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'diff.c-complex-refactor'

export const skip = 1

export const test: Test = async ({ DiffView, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/before.c`,
    `#include <stdint.h>
#include <stdio.h>
#include <string.h>

typedef struct {
    uint32_t id;
    uint16_t samples[4];
    size_t sample_count;
} SensorFrame;

static void clear_frame(SensorFrame *frame) {
    memset(frame, 0, sizeof(*frame));
}

static int load_frame(SensorFrame *frame, const uint16_t *input, size_t count) {
    clear_frame(frame);
    frame->id = 7;

    for (size_t index = 0; index < count && index < 4; index++) {
        frame->samples[index] = input[index];
        frame->sample_count++;
    }

    return frame->sample_count > 0;
}

static void print_frame(const SensorFrame *frame) {
    printf("frame=%u samples=%zu\\n", frame->id, frame->sample_count);
}

int main(void) {
    uint16_t input[] = { 4, 8, 15, 16 };
    SensorFrame frame;

    if (!load_frame(&frame, input, 4)) {
        return 1;
    }

    print_frame(&frame);
    return 0;
}
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/after.c`,
    `#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

typedef struct {
    uint32_t id;
    uint16_t samples[8];
    size_t sample_count;
    bool truncated;
} SensorFrame;

static void reset_frame(SensorFrame *frame, uint32_t id) {
    memset(frame, 0, sizeof(*frame));
    frame->id = id;
}

static int load_frame(SensorFrame *frame, const uint16_t *input, size_t count, bool dedupe) {
    reset_frame(frame, 17);

    for (size_t index = 0; index < count; index++) {
        if (dedupe && frame->sample_count > 0 && frame->samples[frame->sample_count - 1] == input[index]) {
            continue;
        }
        if (frame->sample_count == 8) {
            frame->truncated = true;
            break;
        }

        frame->samples[frame->sample_count] = input[index] * 2;
        frame->sample_count++;
    }

    return !frame->truncated && frame->sample_count >= 3;
}

static void print_frame(const SensorFrame *frame) {
    printf("frame=%u samples=%zu truncated=%d\\n", frame->id, frame->sample_count, frame->truncated);
}

int main(void) {
    uint16_t input[] = { 4, 4, 8, 15, 16, 23, 42 };
    SensorFrame frame;

    if (!load_frame(&frame, input, 7, true)) {
        return 1;
    }

    print_frame(&frame);
    return frame.truncated ? 2 : 0;
}
`,
  )
  await Workspace.setPath(tmpDir)

  await DiffView.open(`${tmpDir}/before.c`, `${tmpDir}/after.c`)

  const beforePane = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const afterPane = Locator('.DiffEditorContentRight .DiffEditorRows')
  const deletedRows = Locator('.DiffEditorContentLeft .EditorRow.Deletion')
  const insertedRows = Locator('.DiffEditorContentRight .EditorRow.Insertion')

  await expect(beforePane).toContainText('uint16_t samples[4];')
  await expect(beforePane).toContainText('static void clear_frame(SensorFrame *frame) {')
  await expect(beforePane).toContainText('frame->id = 7;')
  await expect(afterPane).toContainText('#include <stdbool.h>')
  await expect(afterPane).toContainText('bool truncated;')
  await expect(afterPane).toContainText('static void reset_frame(SensorFrame *frame, uint32_t id) {')
  await expect(deletedRows).toHaveCount(10)
  await expect(insertedRows).toHaveCount(20)
}
