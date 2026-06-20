export const getLines = (content: string): readonly string[] => {
  return content ? content.split('\n') : ['']
}
