export const getCss = (): string => {
  return `
.DiffEditorErrorStack {
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid rgba(248, 81, 73, 0.6);
  border-radius: 6px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.86);
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
  padding: 8px 10px;
  tab-size: 2;
  user-select: text;
}

.DiffEditorErrorStackLine {
  min-width: max-content;
  white-space: pre;
}

.DiffEditorErrorStackLink {
  color: #58a6ff;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: rgba(88, 166, 255, 0.85);
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

  `
}
