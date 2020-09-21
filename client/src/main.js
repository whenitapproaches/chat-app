import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import initBaseComponentsPlugin from "@/plugins/initBaseComponents.plugin"
import store from '@/store'

import "@/assets/scss"

const app = createApp(App)
  .use(router)
  .use(store)
  .use(initBaseComponentsPlugin)

app.mount("#app")
