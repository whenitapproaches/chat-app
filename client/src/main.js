import "@/assets/scss"
import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import initBaseComponentsPlugin from "@/plugins/initBaseComponents.plugin"
import store from "@/store"

import "@/setup"


const app = createApp(App)
.use(initBaseComponentsPlugin)
.use(router)
.use(store)

store.dispatch("clock/updateNowEveryMinute")

app.mount("#app")

import SocketService from "@/services/socket.service.js"

SocketService.init()