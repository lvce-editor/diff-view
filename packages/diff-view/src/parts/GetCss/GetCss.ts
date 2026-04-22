export const getCss = (): string => {
  return `
.DiffEditorErrorCodeFrame,
.DiffEditorErrorStack {
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid rgba(248, 81, 73, 0.6);
  border-radius: 6px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.86);
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
  padding: 8px 10px;
  user-select: text;
  white-space: pre-wrap;
  word-break: break-word;
}

.DiffEditorErrorStackLink {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;
}

  `
}
