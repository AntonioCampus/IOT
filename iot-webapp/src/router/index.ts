import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SystemViewVue from '@/views/SystemView.vue'
import StatisticsViewVue from '@/views/StatisticsView.vue'
import NotFoundViewVue from '@/views/404View.vue'
import AllAlertsViewVue from '@/views/AllAlertsView.vue'
import DetectorViewVue from '@/views/DetectorView.vue'
import AdminDashboardBViewVue from '@/views/AdminDashboardBView.vue'
import LogoutViewVue from '@/views/LogoutView.vue'
import { getToken } from '@/assets/js/token'
import { useUserStore } from '@/stores/user'
import FaultsViewVue from '@/views/FaultsView.vue'
import OverridesViewVue from '@/views/OverridesView.vue'
import ActuatorViewVue from '@/views/ActuatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
      alias: '/login',
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
      path: '/system/actuators/:id',
      name: 'actuator-overview',
      component: ActuatorViewVue
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
      path: '/admin',
      name: 'admin',
      component: AdminDashboardBViewVue
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutViewVue,
    },
    {
      path: '/faults',
      name: 'faults',
      component: FaultsViewVue
    },
    {
      path: '/overrides',
      name: 'overrides',
      component: OverridesViewVue
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.path !== '/' && getToken() === null) return { path: '/' }
  if (to.path === '/admin' && !useUserStore().isAdmin) return { path: '/' }
})
export default router
