import modules from "./modules"

import { inject } from "vue"

export default {
  install(app) {
    modules.forEach((module) => {
      app.provide(module.name, module.store)
    })
  },
}

const store = {}

modules.forEach((module) => {
  store[`${module.name}`] = function() {
    return inject(module.name)
  }
})

export const useStore = (name) => {
  return store[name]()
}
