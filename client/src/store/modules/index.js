const requireModule = require.context(".", false, /\.store\.js$/)
const modules = requireModule.keys().map((filename) => {
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, "")
    .replace(/^\w/, (c) => c.toUpperCase())
  const createStore = requireModule(filename).default || requireModule(filename)

  return {
    name: moduleName,
    store: createStore(),
  }
})

export default modules
