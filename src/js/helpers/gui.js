import * as dat from 'dat.gui'

let gui
const callbacks = []

const init = () => {
  if (!gui) {
    gui = new dat.GUI({width: 300})

    while (callbacks.length) {
      callbacks.shift()(gui)
    }
  }
}

export default {
  init,
  get: (callback) => {
    if (gui) {
      callback(gui)
    } else {
      callbacks.push(callback)
    }
  },
}
