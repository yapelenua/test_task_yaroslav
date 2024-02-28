import { createRouter, createWebHistory } from 'vue-router'
import { beforeEachGuard } from './guard'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(beforeEachGuard)
export default router
