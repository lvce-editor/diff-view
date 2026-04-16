const state = {
  height: 0,
  width: 0,
}

export const get = (): any => {
  return {
    height: state.height,
    width: state.width,
  }
}
