import { upperFirst, camelCase } from "lodash"

export default {
  install(app) {
    loadComponent(app)
  },
}

function loadComponent(app) {
  const requireComponent = require.context(
    "@/components",
    true,
    /Base[A-Z]\w+\.(vue|js)$/,
  )
  requireComponent.keys().forEach((fileName) => {
    // Load component config
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
      camelCase(
        // Strip the leading `./` and extension from the filename
        fileName.replace(/\.\/(.+)\/(.+).(?:vue|js)/, "$1")
      )
    )

    app.component(componentName, componentConfig.default || componentConfig)
  })
}
