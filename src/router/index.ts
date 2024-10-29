import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/ThreejsPractice',
      name: 'ThreejsPractice',
      component: () =>
        import('@/views/ThreejsPractice/ThreejsPracticeIndex.vue'),
    },
  ],
})

export default router
