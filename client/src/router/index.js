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
    path: "/chat/:partnerUsername?",
    name: "Chat",
    component: () => import("@/views/Chat.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
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
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/404.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "NotFound"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
