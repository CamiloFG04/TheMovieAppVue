import { createRouter, createWebHashHistory } from 'vue-router'
import authRoutes from "@/modules/auth/routes";
import entertainmentRoutes from "@/modules/entertainment/routes";
import isAuthenticatedGuard from '@/modules/auth/routes/auth-guard'

const routes = [
  {
    path: '/',
   ...authRoutes
  },
  {
    path: '/entertainment',
    beforeEnter: [isAuthenticatedGuard],
   ...entertainmentRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const session_id = localStorage.getItem('session_id')
  if (from.path !== '/' && to.path === '/' && session_id) {
    return { name: from.name }
  }
})

export default router
