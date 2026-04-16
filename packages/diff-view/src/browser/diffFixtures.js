const fixtures = {
  'empty-before': {
    id: 'empty-before',
    title: 'Empty Before',
    description: 'A new file enters the world with a single inserted line.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: { kind: 'empty', label: 'No previous content' },
        after: {
          kind: 'inserted',
          segments: [{ text: 'const value = 42', kind: 'added' }],
        },
      },
    ],
  },
  'empty-after': {
    id: 'empty-after',
    title: 'Empty After',
    description: 'A file is deleted entirely, leaving the current side empty.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: {
          kind: 'deleted',
          segments: [{ text: 'const value = 42', kind: 'removed' }],
        },
        after: { kind: 'empty', label: 'No current content' },
      },
    ],
  },
  'one-char-change': {
    id: 'one-char-change',
    title: 'One Character Change',
    description: 'A tiny mutation should still feel precise and visible.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: {
          kind: 'modified',
          segments: [
            { text: 'const value = c', kind: 'plain' },
            { text: 'a', kind: 'changed' },
            { text: 't', kind: 'plain' },
          ],
        },
        after: {
          kind: 'modified',
          segments: [
            { text: 'const value = c', kind: 'plain' },
            { text: 'u', kind: 'changed' },
            { text: 't', kind: 'plain' },
          ],
        },
      },
    ],
  },
  'long-inline-change': {
    id: 'long-inline-change',
    title: 'Long Inline Change',
    description: 'Long replacements should create distinct changed islands, not a flat red-green slab.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: {
          kind: 'modified',
          segments: [
            { text: 'const view = ', kind: 'plain' },
            { text: 'loadUserProfileSummary', kind: 'changed' },
            { text: '(user, theme)', kind: 'plain' },
          ],
        },
        after: {
          kind: 'modified',
          segments: [
            { text: 'const view = ', kind: 'plain' },
            { text: 'loadUserProfileCard', kind: 'changed' },
            { text: '(user, palette)', kind: 'plain' },
          ],
        },
      },
      {
        before: {
          kind: 'modified',
          segments: [
            { text: 'return ', kind: 'plain' },
            { text: 'renderCompactSummary', kind: 'changed' },
            { text: '(view)', kind: 'plain' },
          ],
        },
        after: {
          kind: 'modified',
          segments: [
            { text: 'return ', kind: 'plain' },
            { text: 'renderHeroCard', kind: 'changed' },
            { text: '(view)', kind: 'plain' },
          ],
        },
      },
    ],
  },
  'multi-line-replacement': {
    id: 'multi-line-replacement',
    title: 'Multi-Line Replacement',
    description: 'Two changed lines become a clear block swap across both panes.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: {
          kind: 'deleted',
          segments: [{ text: 'const oldValue = computeLegacyValue(input)', kind: 'removed' }],
        },
        after: {
          kind: 'inserted',
          segments: [{ text: 'const nextValue = computeModernValue(input)', kind: 'added' }],
        },
      },
      {
        before: {
          kind: 'deleted',
          segments: [{ text: 'return oldValue', kind: 'removed' }],
        },
        after: {
          kind: 'inserted',
          segments: [{ text: 'return nextValue', kind: 'added' }],
        },
      },
    ],
  },
  'mixed-chunks': {
    id: 'mixed-chunks',
    title: 'Mixed Chunks',
    description: 'Inserted, deleted, and stable rows should create a readable rhythm.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    pairs: [
      {
        before: { kind: 'deleted', segments: [{ text: 'const legacyHeader = createHeader()', kind: 'removed' }] },
        after: { kind: 'inserted', segments: [{ text: 'const heroBanner = createHeroBanner()', kind: 'added' }] },
      },
      {
        before: { kind: 'context', segments: [{ text: 'const body = createBody()', kind: 'plain' }] },
        after: { kind: 'context', segments: [{ text: 'const body = createBody()', kind: 'plain' }] },
      },
      {
        before: {
          kind: 'modified',
          segments: [
            { text: 'renderSection(', kind: 'plain' },
            { text: 'legacySidebar', kind: 'changed' },
            { text: ')', kind: 'plain' },
          ],
        },
        after: {
          kind: 'modified',
          segments: [
            { text: 'renderSection(', kind: 'plain' },
            { text: 'quickNavRail', kind: 'changed' },
            { text: ')', kind: 'plain' },
          ],
        },
      },
      {
        before: { kind: 'deleted', segments: [{ text: 'mountFooterLinks()', kind: 'removed' }] },
        after: { kind: 'inserted', segments: [{ text: 'mountFooterCtas()', kind: 'added' }] },
      },
    ],
  },
}

export const fixtureNames = Object.freeze(Object.keys(fixtures))

export const getFixture = (name) => {
  const fixture = fixtures[name]
  if (!fixture) {
    throw new Error(`Unknown diff fixture: ${name}`)
  }
  return fixture
}