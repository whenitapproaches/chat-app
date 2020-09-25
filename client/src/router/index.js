import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/Chat.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Chat.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/Chat.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
