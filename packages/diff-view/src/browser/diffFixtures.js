// @ts-nocheck

const placeholderBase64 = 'RklYVFVSRQ=='

const createSvgDataUri = (label, accent) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="18" fill="#f7f5ef"/><circle cx="60" cy="44" r="22" fill="${accent}" opacity="0.85"/><rect x="22" y="76" width="76" height="16" rx="8" fill="#1f2937" opacity="0.14"/><text x="60" y="108" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#1f2937">${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const imageDataUris = {
  avif: `data:image/avif;base64,${placeholderBase64}`,
  jpg: `data:image/jpeg;base64,${placeholderBase64}`,
  png: `data:image/png;base64,${placeholderBase64}`,
  webp: `data:image/webp;base64,${placeholderBase64}`,
}

const row = (text, status = 'normal') => ({
  parts: [{ text }],
  status,
})

const changedRow = (parts, status = 'normal') => ({
  parts,
  status,
})

const syntaxRow = (parts, status = 'normal') => ({
  parts,
  status,
})

const errorPane = (errorMessage, errorStack = '') => ({
  errorMessage,
  errorStack,
  type: 'text',
})

const setErrors = (beforeErrorMessage, afterErrorMessage, beforeErrorStack = '', afterErrorStack = '') => ({
  before: errorPane(beforeErrorMessage, beforeErrorStack),
  after: errorPane(afterErrorMessage, afterErrorStack),
})

const fixtures = {
  'empty-after': {
    hero: 'Empty After',
    before: {
      type: 'text',
      rows: [row('const value = 42', 'deleted')],
    },
    after: {
      type: 'text',
      emptyMessage: 'No current content',
    },
  },
  'empty-before': {
    hero: 'Empty Before',
    before: {
      type: 'text',
      emptyMessage: 'No previous content',
    },
    after: {
      type: 'text',
      rows: [row('const value = 42', 'inserted')],
    },
  },
  'image-avif-valid-both': {
    hero: 'AVIF Images',
    before: {
      alt: 'left.avif',
      src: imageDataUris.avif,
      type: 'image',
    },
    after: {
      alt: 'right.avif',
      src: imageDataUris.avif,
      type: 'image',
    },
  },
  'image-invalid-left-valid-right': {
    hero: 'Invalid Left Image',
    before: {
      alt: 'left-invalid.svg',
      errorMessage: 'Failed to load image: left-invalid.svg',
      type: 'image',
    },
    after: {
      alt: 'right-valid.svg',
      src: createSvgDataUri('right', '#0f766e'),
      type: 'image',
    },
  },
  'image-jpg-valid-both': {
    hero: 'JPG Images',
    before: {
      alt: 'left.jpg',
      src: imageDataUris.jpg,
      type: 'image',
    },
    after: {
      alt: 'right.jpg',
      src: imageDataUris.jpg,
      type: 'image',
    },
  },
  'image-left-text-right': {
    hero: 'Image Left Text Right',
    before: {
      alt: 'left.png',
      src: imageDataUris.png,
      type: 'image',
    },
    after: {
      type: 'text',
      rows: [row('const rightValue = 42')],
    },
  },
  'image-png-valid-both': {
    hero: 'PNG Images',
    before: {
      alt: 'left.png',
      src: imageDataUris.png,
      type: 'image',
    },
    after: {
      alt: 'right.png',
      src: imageDataUris.png,
      type: 'image',
    },
  },
  'image-svg-valid-both': {
    hero: 'SVG Images',
    before: {
      alt: 'left.svg',
      src: createSvgDataUri('left', '#dc2626'),
      type: 'image',
    },
    after: {
      alt: 'right.svg',
      src: createSvgDataUri('right', '#2563eb'),
      type: 'image',
    },
  },
  'image-text-left-image-right': {
    hero: 'Text Left Image Right',
    before: {
      type: 'text',
      rows: [row('const leftValue = 42')],
    },
    after: {
      alt: 'right.png',
      src: imageDataUris.png,
      type: 'image',
    },
  },
  'image-webp-valid-both': {
    hero: 'WebP Images',
    before: {
      alt: 'left.webp',
      src: imageDataUris.webp,
      type: 'image',
    },
    after: {
      alt: 'right.webp',
      src: imageDataUris.webp,
      type: 'image',
    },
  },
  'long-inline-change': {
    hero: 'Long Inline Change',
    before: {
      type: 'text',
      rows: [changedRow([{ text: 'function ' }, { text: 'loadUserProfile' }, { text: 'Sum', changed: true }, { text: 'mary', changed: true }, { text: '() {}' }])],
    },
    after: {
      type: 'text',
      rows: [changedRow([{ text: 'function ' }, { text: 'loadUserProfile' }, { text: 'Car', changed: true }, { text: 'd', changed: true }, { text: '() {}' }])],
    },
  },
  'mixed-chunks': {
    hero: 'Mixed Chunks',
    before: {
      type: 'text',
      rows: [row('const legacyHeader = true', 'deleted'), row('renderLegacySidebar()', 'deleted')],
    },
    after: {
      type: 'text',
      rows: [row('const heroBanner = true', 'inserted'), row('renderFreshSidebar()', 'inserted')],
    },
  },
  'multi-line-replacement': {
    hero: 'Multi Line Replacement',
    before: {
      type: 'text',
      rows: [row('return oldValue', 'deleted'), row('cleanupOldValue()', 'deleted')],
    },
    after: {
      type: 'text',
      rows: [row('return nextValue', 'inserted'), row('cleanupNextValue()', 'inserted')],
    },
  },
  'read-error-both': {
    hero: 'Read Error Both Sides',
    ...setErrors(
      'Failed to execute file system provider: no file system provider for protocol "memfs" found',
      'Failed to execute file system provider: no file system provider for protocol "memfs" found',
      'VError: Failed to execute file system provider: no file system provider for protocol "memfs" found\n    at loadFileContent (index 0)',
      'VError: Failed to execute file system provider: no file system provider for protocol "memfs" found\n    at loadFileContent (index 1)',
    ),
  },
  'one-char-change': {
    hero: 'One Char Change',
    before: {
      type: 'text',
      rows: [changedRow([{ text: 'const value = c' }, { text: 'a', changed: true }, { text: 't' }])],
    },
    after: {
      type: 'text',
      rows: [changedRow([{ text: 'const value = c' }, { text: 'u', changed: true }, { text: 't' }])],
    },
  },
  'syntax-highlighting-typescript': {
    hero: 'Syntax Highlighting TypeScript',
    before: {
      type: 'text',
      rows: [
        syntaxRow([
          { text: 'const', className: 'Token Keyword' },
          { text: ' leftValue ', className: 'Token Text' },
          { text: '=', className: 'Token Text' },
          { text: ' ', className: 'Token Text' },
          { text: '1', className: 'Token Numeric' },
        ]),
      ],
    },
    after: {
      type: 'text',
      rows: [
        syntaxRow([
          { text: 'const', className: 'Token Keyword' },
          { text: ' rightValue ', className: 'Token Text' },
          { text: '=', className: 'Token Text' },
          { text: ' ', className: 'Token Text' },
          { text: '2', className: 'Token Numeric' },
        ]),
      ],
    },
  },
}

export const fixtureNames = Object.freeze(Object.keys(fixtures).sort())

export const getFixture = (fixtureName) => {
  const fixture = fixtures[fixtureName]
  if (!fixture) {
    throw new Error(`Unknown fixture: ${fixtureName}`)
  }
  return fixture
}
