import unrest from '@unrest/vue'
import { createRouter, createWebHistory } from 'vue-router'

import views from '@/views'

const routes = [...unrest.loadViews(views)]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(unrest.applyMeta)

export default router
