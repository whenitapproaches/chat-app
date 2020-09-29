import "@/assets/scss"
import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import initBaseComponentsPlugin from "@/plugins/initBaseComponents.plugin"
import store from '@/store'


const app = createApp(App)
  .use(initBaseComponentsPlugin)
  .use(router)
  .use(store)

app.mount("#app")
