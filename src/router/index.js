import { createRouter, createWebHashHistory } from 'vue-router'
import authRoutes from "@/modules/auth/routes";
const routes = [
  {
    path: '/',
   ...authRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
