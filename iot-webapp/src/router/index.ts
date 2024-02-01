import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SystemViewVue from '@/views/SystemView.vue'
import StatisticsViewVue from '@/views/StatisticsView.vue'
import NotFoundViewVue from '@/views/404View.vue'
import AlertViewVue from '@/views/AlertView.vue'
import AllAlertsViewVue from '@/views/AllAlertsView.vue'
import DetectorViewVue from '@/views/DetectorView.vue'
import AdminDashboardBViewVue from '@/views/AdminDashboardBView.vue'
import { useSessionStore } from '@/stores/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
      alias: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      alias: '/home'
    },
    {
      path: '/system',
      name: 'system',
      component: SystemViewVue
    },
    {
      path: '/system/detectors/:id',
      name: 'detector-overview',
      component: DetectorViewVue
    },
    {
      path: '/statistics',
      name: 'stats',
      component: StatisticsViewVue
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundViewVue
    },
    {
      path: '/alerts',
      name: 'all-alerts',
      component: AllAlertsViewVue
    },
    {
      path: '/alerts/:id',
      name: 'alert-overview',
      component: AlertViewVue
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardBViewVue
    }
  ]
})

/* router.beforeEach((to, from) => {
  if (to.path !== '/' && useSessionStore().getToken === '') {
    return { path: '/' }
  }
}) */
export default router
